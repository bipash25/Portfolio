'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../new/new-blog.module.css'; // Reuse styles
import RichTextEditor from '@/components/RichTextEditor';

export default function EditBlog({ params }) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        tags: '',
        isPublished: false,
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch blog');
                const data = await res.json();
                setFormData({
                    ...data,
                    tags: data.tags.join(', '),
                });
            } catch (error) {
                console.error(error);
                alert('Error loading blog');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleContentChange = (value) => {
        setFormData(prev => ({ ...prev, content: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/blogs/${params.id}`, {
            method: 'PUT',
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
            alert('Failed to update blog');
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div>
            <h1 className={styles.title}>Edit Blog</h1>
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
                    <RichTextEditor
                        value={formData.content}
                        onChange={handleContentChange}
                        placeholder="Write something amazing..."
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
                <button type="submit" className={styles.submitBtn}>Update Blog</button>
            </form>
        </div>
    );
}
