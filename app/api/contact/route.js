import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const newContact = await Contact.create({ name, email, message });
        return NextResponse.json({ message: 'Message sent successfully', contact: newContact }, { status: 201 });
    } catch (error) {
        console.error('Contact error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
