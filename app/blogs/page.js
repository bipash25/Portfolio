import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Link from 'next/link';
import styles from './blogs.module.css';

export const metadata = {
    title: 'Blogs | Biprodeep Nath',
    description: 'Thoughts, tutorials, and insights on development and life.',
};

async function getBlogs() {
    await dbConnect();
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean();

    return blogs.map(b => ({
        ...b,
        _id: b._id.toString(),
        createdAt: b.createdAt?.toString(),
        updatedAt: b.updatedAt?.toString(),
    }));
}

export default async function Blogs() {
    const blogs = await getBlogs();

    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>My Blogs</h1>
                <p className={styles.subtitle}>Sharing what I learn along the way.</p>
            </section>

            {blogs.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No blogs published yet. Stay tuned!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {blogs.map((blog) => (
                        <Link href={`/blogs/${blog.slug}`} key={blog._id} className={styles.card}>
                            <h2 className={styles.blogTitle}>{blog.title}</h2>
                            <p className={styles.excerpt}>{blog.content.substring(0, 150)}...</p>
                            <div className={styles.meta}>
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                <span className={styles.tags}>{blog.tags.join(', ')}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
