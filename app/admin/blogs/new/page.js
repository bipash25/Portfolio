'use client';

import BlogForm from '@/components/BlogForm';
import styles from './new.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NewBlogPage() {
    const { status } = useSession();
    const router = useRouter();

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'unauthenticated') {
        router.push('/admin/login');
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Blog Post</h1>
            <BlogForm />
        </div>
    );
}
