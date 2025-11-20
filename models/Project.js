import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this project.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
