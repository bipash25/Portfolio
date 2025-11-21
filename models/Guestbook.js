import mongoose from 'mongoose';

const GuestbookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        maxlength: [500, 'Message cannot be more than 500 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Guestbook || mongoose.model('Guestbook', GuestbookSchema);
