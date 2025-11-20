const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/bipro-portfolio';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    await mongoose.connect(MONGODB_URI);

    const username = 'admin';
    const password = 'password'; // Change this!
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log('Admin user already exists.');
    } else {
        await User.create({
            username,
            password: hashedPassword,
            role: 'admin',
        });
        console.log('Admin user created. Username: admin, Password: password');
    }

    await mongoose.disconnect();
}

seed().catch(console.error);
