'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './not-found.module.css'; // Reuse 404 styles

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>Oops!</h1>
                <h2 className={styles.title}>Something went wrong</h2>
                <p className={styles.description}>
                    A glitch in the matrix has occurred. We are working to fix it.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => reset()} className={styles.homeBtn}>
                        Try Again
                    </button>
                    <Link href="/" className={styles.homeBtn} style={{ background: 'transparent', border: '1px solid var(--primary)' }}>
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
