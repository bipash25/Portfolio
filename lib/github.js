export async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

export async function fetchRepoDetails(username, repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

        if (!response.ok) {
            throw new Error('Failed to fetch repo details');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching repo details:', error);
        return null;
    }
}
