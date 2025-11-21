import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this project.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    slug: {
        type: String,
        unique: true,
        sparse: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this project.'],
    },
    githubUrl: {
        type: String,
        required: [true, 'Please provide the GitHub URL'],
    },
    liveUrl: {
        type: String,
    },
    techStack: {
        type: [String],
    },
    githubId: {
        type: Number,
        unique: true,
        sparse: true, // Allows null/undefined for custom projects
    },
    language: {
        type: String,
    },
    topics: {
        type: [String],
    },
    stars: {
        type: Number,
        default: 0,
    },
    forks: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
    },
    isCustom: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
