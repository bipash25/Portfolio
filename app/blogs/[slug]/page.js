import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import styles from './blog-post.module.css';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    await dbConnect();
    const blog = await Blog.findOne({ slug: params.slug });
    if (!blog) return { title: 'Blog Not Found' };
    return {
        title: `${blog.title} | Biprodeep Nath`,
        description: blog.content.substring(0, 160),
    };
}

async function getBlog(slug) {
    await dbConnect();
    const blog = await Blog.findOne({ slug, isPublished: true });
    return blog;
}

export default async function BlogPost({ params }) {
    const blog = await getBlog(params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className={styles.main}>
            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{blog.title}</h1>
                    <div className={styles.meta}>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span> • </span>
                        <span>{blog.tags.join(', ')}</span>
                    </div>
                </header>
                <div className={styles.content}>
                    {/* In a real app, use a markdown parser like react-markdown here */}
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </main>
    );
}
