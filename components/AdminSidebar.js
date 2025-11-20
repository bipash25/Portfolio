'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FaHome, FaProjectDiagram, FaBlog, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>Admin Panel</div>
            <nav className={styles.nav}>
                <Link href="/admin" className={`${styles.link} ${isActive('/admin') ? styles.active : ''}`}>
                    <FaHome /> Dashboard
                </Link>
                <Link href="/admin/projects" className={`${styles.link} ${isActive('/admin/projects') ? styles.active : ''}`}>
                    <FaProjectDiagram /> Projects
                </Link>
                <Link href="/admin/blogs" className={`${styles.link} ${isActive('/admin/blogs') ? styles.active : ''}`}>
                    <FaBlog /> Blogs
                </Link>
                <Link href="/admin/messages" className={`${styles.link} ${isActive('/admin/messages') ? styles.active : ''}`}>
                    <FaEnvelope /> Messages
                </Link>
            </nav>
            <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutBtn}>
                <FaSignOutAlt /> Logout
            </button>
        </aside>
    );
};

export default AdminSidebar;
