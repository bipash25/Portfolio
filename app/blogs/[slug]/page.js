import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import styles from './blog-post.module.css';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import CommentSection from '@/components/CommentSection';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '@/components/CodeBlock';

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
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <CodeBlock
                                            language={match[1]}
                                            value={String(children).replace(/\n$/, '')}
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </div>
                </article>

                <CommentSection blogId={blog._id} />
            </div>
        </main>
    );
}
