import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Link from 'next/link';
import styles from './blogs.module.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

async function getBlogs() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return blogs;
}

export default async function AdminBlogs() {
    const blogs = await getBlogs();

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Manage Blogs</h1>
                <Link href="/admin/blogs/new" className={styles.createBtn}>
                    <FaPlus /> New Blog
                </Link>
            </div>

            <div className={styles.list}>
                {blogs.map((blog) => (
                    <div key={blog._id} className={styles.item}>
                        <div>
                            <h3 className={styles.blogTitle}>{blog.title}</h3>
                            <span className={styles.status}>
                                {blog.isPublished ? 'Published' : 'Draft'}
                            </span>
                        </div>
                        <div className={styles.actions}>
                            <Link href={`/admin/blogs/${blog._id}`} className={styles.actionBtn}>
                                <FaEdit />
                            </Link>
                            {/* Delete button would need client component or form action */}
                            <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
