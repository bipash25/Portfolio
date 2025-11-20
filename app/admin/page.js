'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { FaGithub, FaPlus, FaEdit, FaTrash, FaSync } from 'react-icons/fa';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [syncing, setSyncing] = useState(false);
    const [syncStats, setSyncStats] = useState(null);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchBlogs();
        }
    }, [status]);

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/admin/login');
        return null;
    }

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchBlogs();
            } else {
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        setSyncStats(null);
        try {
            const res = await fetch('/api/admin/sync-github', { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                setSyncStats(data.stats);
            } else {
                alert('Sync failed: ' + data.error);
            }
        } catch (error) {
            console.error(error);
            alert('Sync failed');
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
                <div className={styles.userInfo}>
                    <span>Welcome, {session.user.name}</span>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.card}>
                    <h2>GitHub Sync</h2>
                    <p>Fetch latest projects from GitHub and update the database.</p>
                    <button
                        className={styles.syncBtn}
                        onClick={handleSync}
                        disabled={syncing}
                    >
                        <FaGithub /> {syncing ? 'Syncing...' : 'Sync Projects'}
                    </button>
                    {syncStats && (
                        <div className={styles.stats}>
                            <p>Added: {syncStats.added}</p>
                            <p>Updated: {syncStats.updated}</p>
                            <p>Errors: {syncStats.errors}</p>
                        </div>
                    )}
                </section>

                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Blog Management</h2>
                        <button className={styles.addBtn} onClick={() => router.push('/admin/blogs/new')}>
                            <FaPlus /> New Post
                        </button>
                    </div>
                    <div className={styles.blogList}>
                        {blogs.length === 0 ? (
                            <p>No blogs found.</p>
                        ) : (
                            <ul className={styles.list}>
                                {blogs.map(blog => (
                                    <li key={blog._id} className={styles.listItem}>
                                        <div>
                                            <h3>{blog.title}</h3>
                                            <span className={blog.isPublished ? styles.published : styles.draft}>
                                                {blog.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <div className={styles.actions}>
                                            <button onClick={() => router.push(`/admin/blogs/${blog._id}`)} className={styles.iconBtn}>
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDeleteBlog(blog._id)} className={styles.iconBtn}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
