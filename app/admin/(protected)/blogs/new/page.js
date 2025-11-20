'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new-blog.module.css';

export default function NewBlog() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        tags: '',
        isPublished: false,
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()),
            }),
        });

        if (res.ok) {
            router.push('/admin/blogs');
            router.refresh();
        } else {
            alert('Failed to create blog');
        }
    };

    return (
        <div>
            <h1 className={styles.title}>Create New Blog</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.group}>
                    <label>Content</label>
                    <textarea
                        name="content"
                        rows="15"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
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
                <button type="submit" className={styles.submitBtn}>Create Blog</button>
            </form>
        </div>
    );
}
