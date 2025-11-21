'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './CommentSection.module.css';

export default function CommentSection({ projectId, blogId }) {
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({ author: '', content: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (projectId || blogId) {
            fetchComments();
        }
    }, [projectId, blogId]);

    const fetchComments = async () => {
        const query = projectId ? `projectId=${projectId}` : `blogId=${blogId}`;
        const res = await fetch(`/api/comments?${query}`);
        const data = await res.json();
        if (data.success) {
            setComments(data.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            ...(projectId && { projectId }),
            ...(blogId && { blogId }),
        };

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (data.success) {
                setFormData({ author: '', content: '' });
                fetchComments();
            }
        } catch (err) {
            console.error('Failed to submit comment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Comments ({comments.length})</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                    className={styles.input}
                />
                <textarea
                    placeholder="Leave a comment..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    className={styles.textarea}
                />
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>

            <div className={styles.commentsList}>
                {comments.map((comment) => (
                    <motion.div
                        key={comment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.comment}
                    >
                        <div className={styles.commentHeader}>
                            <span className={styles.author}>{comment.author}</span>
                            <span className={styles.date}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className={styles.content}>{comment.content}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
