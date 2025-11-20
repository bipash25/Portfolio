import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export async function POST(req) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await req.json();
        const blog = await Blog.create(body);
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
