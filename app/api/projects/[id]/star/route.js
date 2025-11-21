import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const project = await Project.findByIdAndUpdate(
            id,
            { $inc: { stars: 1 } },
            { new: true }
        );

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, stars: project.stars });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
