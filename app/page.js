import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import Link from 'next/link';
import styles from './home.module.css';
import { FaArrowRight } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

async function getData() {
    await dbConnect();
    const projects = await Project.find({}).sort({ stars: -1, updatedAt: -1 }).limit(3).lean();
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3).lean();

    // Convert _id and dates to strings to avoid serialization issues
    const serializedProjects = projects.map(p => ({
        ...p,
        _id: p._id.toString(),
        createdAt: p.createdAt?.toString(),
        updatedAt: p.updatedAt?.toString(),
    }));

    const serializedBlogs = blogs.map(b => ({
        ...b,
        _id: b._id.toString(),
        createdAt: b.createdAt?.toString(),
        updatedAt: b.updatedAt?.toString(),
    }));

    return { projects: serializedProjects, blogs: serializedBlogs };
}

export default async function Home() {
    const { projects, blogs } = await getData();

    return (
        <main>
            <Hero />

            {/* Featured Projects Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Featured Work</h2>
                        <Link href="/projects" className={styles.viewAll}>
                            View All <FaArrowRight />
                        </Link>
                    </div>
                    <div className={styles.grid}>
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className={styles.aboutSection}>
                <div className={styles.container}>
                    <div className={styles.aboutContent}>
                        <h2 className={styles.sectionTitle}>More Than Code</h2>
                        <p className={styles.aboutText}>
                            I'm not just a developer. I'm a student, a science enthusiast, and a thinker.
                            My journey started with a curiosity about how things work, from mobile games to the universe itself.
                        </p>
                        <Link href="/about" className={styles.primaryBtn}>
                            Read My Story
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest Blogs Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Latest Thoughts</h2>
                        <Link href="/blogs" className={styles.viewAll}>
                            Read All <FaArrowRight />
                        </Link>
                    </div>
                    <div className={styles.blogGrid}>
                        {blogs.map((blog) => (
                            <Link href={`/blogs/${blog.slug}`} key={blog._id} className={styles.blogCard}>
                                <span className={styles.blogDate}>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                <h3 className={styles.blogTitle}>{blog.title}</h3>
                                <p className={styles.blogExcerpt}>{blog.content.substring(0, 100)}...</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
