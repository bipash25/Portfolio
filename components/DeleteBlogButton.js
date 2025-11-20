'use client';

import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/(protected)/blogs/blogs.module.css';

export default function DeleteBlogButton({ id }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting blog');
        }
    };

    return (
        <button onClick={handleDelete} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
            <FaTrash />
        </button>
    );
}
