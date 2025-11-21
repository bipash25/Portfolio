import dbConnect from '@/lib/db';
import Guestbook from '@/models/Guestbook';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const entries = await Guestbook.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: entries });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const entry = await Guestbook.create(body);
        return NextResponse.json({ success: true, data: entry }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
