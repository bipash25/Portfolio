async function checkRepos() {
    const username = 'bipash25';
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const repos = await response.json();
        console.log(`Found ${repos.length} repos.`);
        repos.forEach(r => console.log(`- ${r.name} (${r.stargazers_count} stars)`));
    } catch (e) {
        console.error(e);
    }
}

checkRepos();
