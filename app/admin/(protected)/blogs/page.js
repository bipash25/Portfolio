import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Link from 'next/link';
import styles from './blogs.module.css';
import { FaPlus, FaEdit } from 'react-icons/fa';
import DeleteBlogButton from '@/components/DeleteBlogButton';

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
                            <DeleteBlogButton id={blog._id.toString()} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
