'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BlogForm.module.css';

export default function BlogForm({ initialData = null }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        content: initialData?.content || '',
        tags: initialData?.tags?.join(', ') || '',
        coverImage: initialData?.coverImage || '',
        isPublished: initialData?.isPublished || false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        };

        try {
            const url = initialData ? `/api/blogs/${initialData._id}` : '/api/blogs';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                const err = await res.json();
                alert('Error: ' + err.error);
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Slug</label>
                <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Cover Image URL</label>
                <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Tags (comma separated)</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Content (Markdown)</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                    rows={15}
                />
            </div>

            <div className={styles.checkboxGroup}>
                <label>
                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                    />
                    Publish immediately
                </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Saving...' : 'Save Blog Post'}
            </button>
        </form>
    );
}
