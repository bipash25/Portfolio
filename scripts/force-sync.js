require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
// const fetch = require('node-fetch'); // Built-in in Node 18+

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    githubUrl: String,
    liveUrl: String,
    stars: Number,
    forks: Number,
    techStack: [String],
    updatedAt: Date,
    isCustom: { type: Boolean, default: false },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

async function forceSync() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const username = 'bipash25';
        const repos = await fetchGitHubRepos(username);
        console.log(`Found ${repos.length} repos on GitHub.`);

        let syncedCount = 0;
        for (const repo of repos) {
            const existingProject = await Project.findOne({ githubUrl: repo.html_url });
            const projectData = {
                name: repo.name,
                description: repo.description || 'No description available.',
                githubUrl: repo.html_url,
                liveUrl: repo.homepage,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                techStack: [repo.language].filter(Boolean),
                updatedAt: new Date(),
            };

            if (existingProject) {
                if (!existingProject.isCustom) {
                    await Project.findByIdAndUpdate(existingProject._id, projectData);
                    syncedCount++;
                }
            } else {
                await Project.create(projectData);
                syncedCount++;
            }
        }
        console.log(`Synced ${syncedCount} projects.`);

        const total = await Project.countDocuments();
        console.log(`Total in DB: ${total}`);

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

forceSync();
