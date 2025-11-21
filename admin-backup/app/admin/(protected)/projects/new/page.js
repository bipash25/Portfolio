'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new-project.module.css';

export default function NewProject() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        githubUrl: '',
        liveUrl: '',
        techStack: '',
        imageUrl: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                techStack: formData.techStack.split(',').map(t => t.trim()),
                isCustom: true,
            }),
        });

        if (res.ok) {
            router.push('/admin/projects');
            router.refresh();
        } else {
            alert('Failed to create project');
        }
    };

    return (
        <div>
            <h1 className={styles.title}>Add Custom Project</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label>Project Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className={styles.group}>
                    <label>GitHub URL</label>
                    <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Live URL</label>
                    <input
                        type="url"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.group}>
                    <label>Tech Stack (comma separated)</label>
                    <input
                        type="text"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={styles.submitBtn}>Add Project</button>
            </form>
        </div>
    );
}
