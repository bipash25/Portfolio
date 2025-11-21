import dbConnect from '@/lib/db';
import Comment from '@/models/Comment';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const blogId = searchParams.get('blogId');

    try {
        let query = {};
        if (projectId) query.projectId = projectId;
        if (blogId) query.blogId = blogId;

        const comments = await Comment.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: comments });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const comment = await Comment.create(body);
        return NextResponse.json({ success: true, data: comment }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
