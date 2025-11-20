import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import styles from './blog-post.module.css';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export async function generateMetadata({ params }) {
    await dbConnect();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug });
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
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/blogs" className={styles.backLink}>
                    <FaArrowLeft /> Back to Blogs
                </Link>

                <article className={styles.article}>
                    <header className={styles.header}>
                        <div className={styles.meta}>
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span className={styles.dot}>•</span>
                            <span>{readingTime} min read</span>
                        </div>
                        <h1 className={styles.title}>{blog.title}</h1>
                        <div className={styles.tags}>
                            {blog.tags.map(tag => (
                                <span key={tag} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                    </header>

                    <div className={styles.content}>
                        {/* In a real app, use a markdown parser like react-markdown here */}
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </article>
            </div>
        </main>
    );
}
