'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className={styles.cursor}
                variants={{
                    default: {
                        x: mousePosition.x - 10,
                        y: mousePosition.y - 10,
                    },
                    hover: {
                        x: mousePosition.x - 10,
                        y: mousePosition.y - 10,
                        scale: 1.5,
                        backgroundColor: 'var(--primary)',
                        mixBlendMode: 'difference'
                    }
                }}
                animate={isHovering ? 'hover' : 'default'}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />
            <motion.div
                className={styles.cursorDot}
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{ type: 'spring', stiffness: 1500, damping: 50 }}
            />
        </>
    );
}
