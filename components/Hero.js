'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <div className={styles.hero}>
            {/* Background Glows */}
            <div className={styles.glowOne}></div>
            <div className={styles.glowTwo}></div>

            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>
                        I'm <span className={styles.highlight}>BIPRO</span>.
                    </h1>
                    <h2 className={styles.subtitle}>
                        Student. Developer. Thinker.
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className={styles.description}
                >
                    I turn complex ideas into digital reality. Welcome to my corner of the internet, where I showcase my journey in code, science, and philosophy.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={styles.buttons}
                >
                    <Link href="/projects" className={styles.primaryBtn}>
                        View Projects
                    </Link>
                    <Link href="/contact" className={styles.secondaryBtn}>
                        Contact Me
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
