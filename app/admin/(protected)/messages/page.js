'use client';

import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/contact/messages');
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className={styles.title}>Messages</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.list}>
                    {messages.length === 0 ? (
                        <p>No messages found.</p>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg._id} className={styles.card}>
                                <h3>{msg.name} <span style={{ fontSize: '0.8rem', color: '#888' }}>({msg.email})</span></h3>
                                <p style={{ margin: '10px 0', color: '#ddd' }}>{msg.message}</p>
                                <small style={{ color: '#666' }}>{new Date(msg.createdAt).toLocaleString()}</small>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
