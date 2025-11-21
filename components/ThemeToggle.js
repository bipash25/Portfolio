'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--foreground)',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)'
            }}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </motion.button>
    );
}
