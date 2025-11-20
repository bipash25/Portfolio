'use client';

import { useState } from 'react';
import styles from '@/app/admin/(protected)/dashboard.module.css';

export default function SyncProjects() {
    const [syncing, setSyncing] = useState(false);
    const [message, setMessage] = useState('');

    const handleSync = async () => {
        setSyncing(true);
        setMessage('');
        try {
            const res = await fetch('/api/projects/sync', { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            } else {
                setMessage('Sync failed: ' + data.error);
            }
        } catch (err) {
            setMessage('Sync error');
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className={styles.card}>
            <h2>Sync GitHub Projects</h2>
            <p>Fetch latest repositories from GitHub.</p>
            <button onClick={handleSync} disabled={syncing} className={styles.btn}>
                {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}
