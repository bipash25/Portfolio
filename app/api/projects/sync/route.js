import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { fetchGitHubRepos } from '@/lib/github';

export async function POST(req) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const username = 'bipash25'; // User's GitHub username
        const repos = await fetchGitHubRepos(username);

        let syncedCount = 0;

        for (const repo of repos) {
            // Skip forks if desired, or keep them. User didn't specify.
            // We'll sync everything for now.

            // Check if project exists
            const existingProject = await Project.findOne({ githubUrl: repo.html_url });

            const projectData = {
                name: repo.name,
                description: repo.description || 'No description available.',
                githubUrl: repo.html_url,
                liveUrl: repo.homepage,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                techStack: [repo.language].filter(Boolean), // Simple extraction, can be improved
                updatedAt: new Date(),
            };

            if (existingProject) {
                // Update existing
                if (!existingProject.isCustom) { // Don't overwrite custom overrides if any (unless we want to)
                    await Project.findByIdAndUpdate(existingProject._id, projectData);
                    syncedCount++;
                }
            } else {
                // Create new
                await Project.create(projectData);
                syncedCount++;
            }
        }

        return NextResponse.json({ message: `Synced ${syncedCount} projects successfully.` });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: 'Failed to sync projects' }, { status: 500 });
    }
}
