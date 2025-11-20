'use client';

import { useState, useEffect } from 'react';
import BlogForm from '@/components/BlogForm';
import styles from '../new/new.module.css'; // Reuse styles
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function EditBlogPage({ params }) {
    const { status } = useSession();
    const router = useRouter();
    const { id } = use(params);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchBlog();
        }
    }, [status, id]);

    const fetchBlog = async () => {
        try {
            const res = await fetch(`/api/blogs/${id}`);
            if (res.ok) {
                const data = await res.json();
                setBlog(data);
            } else {
                alert('Blog not found');
                router.push('/admin');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) return <div>Loading...</div>;
    if (status === 'unauthenticated') {
        router.push('/admin/login');
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Blog Post</h1>
            {blog && <BlogForm initialData={blog} />}
        </div>
    );
}
