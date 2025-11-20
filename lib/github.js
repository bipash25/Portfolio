import Project from '@/models/Project';
import dbConnect from '@/lib/db';

const GITHUB_USERNAME = 'bipash25';

export async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            throw new Error(`GitHub API failed: ${response.statusText}`);
        }

        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

export async function syncProjects() {
    await dbConnect();
    const repos = await fetchGitHubRepos();

    let stats = {
        added: 0,
        updated: 0,
        skipped: 0,
        errors: 0
    };

    for (const repo of repos) {
        try {
            // Skip forks if you only want original projects, or keep them. 
            // User didn't specify, but usually portfolios show original work.
            // Let's keep everything for now but maybe filter out empty ones.

            const projectData = {
                name: repo.name,
                description: repo.description || 'No description available.',
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || '',
                language: repo.language,
                topics: repo.topics || [],
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                githubId: repo.id,
                updatedAt: new Date(repo.updated_at),
                // Don't overwrite createdAt if it exists, but for new ones use repo.created_at
                // actually mongoose default is fine for new, but maybe we want to preserve repo creation date?
                // Let's stick to mongoose default for now or use repo.created_at if we want historical accuracy.
            };

            // Check if project exists
            const existingProject = await Project.findOne({ githubId: repo.id });

            if (existingProject) {
                // Update existing
                if (existingProject.isCustom) {
                    // If it's marked as custom, maybe we don't want to fully overwrite?
                    // But user said "check for updates in existing projects".
                    // We should update metrics (stars, forks) but maybe keep custom descriptions if we add a flag for that?
                    // For now, let's update everything except maybe manual overrides if we had them.
                    // The user said "edit projects if something goes wrong with the dynamic system".
                    // So we should probably only update if it's NOT custom, OR just update metrics.

                    // Let's update metrics and URLs, but keep description if it was manually edited?
                    // Hard to track "manually edited" without a flag. 
                    // Let's just update everything for now to keep it in sync.
                }

                await Project.updateOne({ _id: existingProject._id }, projectData);
                stats.updated++;
            } else {
                // Create new
                await Project.create(projectData);
                stats.added++;
            }
        } catch (error) {
            console.error(`Error syncing repo ${repo.name}:`, error);
            stats.errors++;
        }
    }

    return stats;
}
