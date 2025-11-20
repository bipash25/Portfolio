const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
const MONGODB_URI = envConfig.match(/MONGODB_URI=(.*)/)?.[1]?.trim();

if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
}

const ProjectSchema = new mongoose.Schema({
    name: String,
    stars: Number,
    updatedAt: Date,
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        const count = await Project.countDocuments();
        console.log(`Total Projects: ${count}`);
        const projects = await Project.find({}, 'name stars').lean();
        console.log('Projects:', projects);
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

checkDB();
