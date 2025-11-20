import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import styles from './blogs.module.css';
import BlogList from '@/components/BlogList';

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

            <BlogList initialBlogs={blogs} />
        </main>
    );
}
