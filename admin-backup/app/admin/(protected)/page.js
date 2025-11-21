import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import Project from '@/models/Project';
import styles from './dashboard.module.css';
import { FaBlog, FaProjectDiagram, FaEye, FaEnvelope } from 'react-icons/fa';
import SyncProjects from '@/components/SyncProjects';

async function getStats() {
    await dbConnect();
    const blogCount = await Blog.countDocuments();
    const projectCount = await Project.countDocuments();
    // Mock views for now
    const totalViews = 12453;
    const messageCount = 0; // Placeholder for contact messages if implemented

    return { blogCount, projectCount, totalViews, messageCount };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className={styles.title}>Dashboard Overview</h1>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.iconWrapper} style={{ background: 'rgba(112, 0, 255, 0.1)', color: '#7000ff' }}>
                        <FaBlog />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>Total Blogs</h3>
                        <p>{stats.blogCount}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.iconWrapper} style={{ background: 'rgba(0, 243, 255, 0.1)', color: '#00f3ff' }}>
                        <FaProjectDiagram />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>Projects</h3>
                        <p>{stats.projectCount}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.iconWrapper} style={{ background: 'rgba(255, 0, 128, 0.1)', color: '#ff0080' }}>
                        <FaEye />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>Total Views</h3>
                        <p>{stats.totalViews.toLocaleString()}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.iconWrapper} style={{ background: 'rgba(255, 165, 0, 0.1)', color: '#ffa500' }}>
                        <FaEnvelope />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>Messages</h3>
                        <p>{stats.messageCount}</p>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <SyncProjects />
            </div>
        </div>
    );
}
