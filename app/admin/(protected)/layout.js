import AdminSidebar from '@/components/AdminSidebar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import styles from './admin-layout.module.css';

export default async function AdminLayout({ children }) {
    const session = await getServerSession();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className={styles.layout}>
            <AdminSidebar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
