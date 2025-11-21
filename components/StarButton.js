'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './StarButton.module.css';

export default function StarButton({ projectId, initialStars }) {
    const [stars, setStars] = useState(initialStars);
    const [starred, setStarred] = useState(false);

    const handleStar = async () => {
        if (starred) return;

        try {
            const res = await fetch(`/api/projects/${projectId}/star`, {
                method: 'POST',
            });
            const data = await res.json();
            if (data.success) {
                setStars(data.stars);
                setStarred(true);
            }
        } catch (err) {
            console.error('Failed to star project');
        }
    };

    return (
        <button
            onClick={handleStar}
            className={`${styles.starBtn} ${starred ? styles.starred : ''}`}
            disabled={starred}
            title={starred ? 'Starred!' : 'Star this project'}
        >
            <FaStar className={styles.icon} />
            <span>{stars} Stars</span>
        </button>
    );
}
