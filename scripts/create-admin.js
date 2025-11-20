require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
    try {
        if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI missing');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const existingUser = await User.findOne({ username: 'admin' });
        if (existingUser) {
            console.log('Admin user already exists.');
            // Optional: Update password if needed
            // const hashedPassword = await bcrypt.hash('password', 10);
            // existingUser.password = hashedPassword;
            // await existingUser.save();
            // console.log('Admin password reset to "password"');
        } else {
            const hashedPassword = await bcrypt.hash('password', 10);
            await User.create({ username: 'admin', password: hashedPassword });
            console.log('Admin user created.');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
