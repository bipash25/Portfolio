'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './guestbook.module.css';

export default function Guestbook() {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await fetch('/api/guestbook');
            const data = await res.json();
            if (data.success) {
                setEntries(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch guestbook entries');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                setFormData({ name: '', message: '' });
                fetchEntries();
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to submit message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.header}
            >
                <h1 className={styles.title}>Guestbook</h1>
                <p className={styles.subtitle}>Leave a mark on my digital corner.</p>
            </motion.div>

            <div className={styles.content}>
                <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className={styles.form}
                >
                    <h2 className={styles.formTitle}>Sign the Guestbook</h2>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            maxLength={50}
                            placeholder="Your name"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            maxLength={500}
                            placeholder="Say something nice..."
                            rows={4}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Signing...' : 'Sign Guestbook'}
                    </button>
                </motion.form>

                <div className={styles.entries}>
                    {entries.map((entry, index) => (
                        <motion.div
                            key={entry._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className={styles.entryCard}
                        >
                            <div className={styles.entryHeader}>
                                <span className={styles.entryName}>{entry.name}</span>
                                <span className={styles.entryDate}>
                                    {new Date(entry.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className={styles.entryMessage}>{entry.message}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
