import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide a comment'],
        maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
    author: {
        type: String,
        required: [true, 'Please provide your name'],
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
