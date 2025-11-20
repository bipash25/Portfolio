import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this blog post.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
        type: String,
        required: [true, 'Please provide the content for this blog post.'],
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug for this blog post.'],
        unique: true,
    },
    tags: {
        type: [String],
    },
    coverImage: {
        type: String,
    },
    author: {
        type: String,
        default: 'Biprodeep Nath',
    },
    isPublished: {
        type: Boolean,
        default: false,
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

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
