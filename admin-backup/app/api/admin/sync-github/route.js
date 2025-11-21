import { NextResponse } from 'next/server';
import { syncProjects } from '@/lib/github';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const stats = await syncProjects();
        return NextResponse.json({ message: 'Sync successful', stats });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
    }
}
