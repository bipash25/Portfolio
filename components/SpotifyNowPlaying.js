'use client';

import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';
import Link from 'next/link';
import styles from './SpotifyNowPlaying.module.css';

export default function SpotifyNowPlaying() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/spotify');
                const json = await res.json();
                setData(json);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    if (!data?.isPlaying) {
        return (
            <div className={styles.container}>
                <FaSpotify className={styles.icon} />
                <span className={styles.text}>Not Playing</span>
            </div>
        );
    }

    return (
        <Link href={data.songUrl} target="_blank" rel="noopener noreferrer" className={styles.container}>
            <FaSpotify className={`${styles.icon} ${styles.playing}`} />
            <div className={styles.content}>
                <span className={styles.title}>{data.title}</span>
                <span className={styles.artist}>{data.artist}</span>
            </div>
        </Link>
    );
}
