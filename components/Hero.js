'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.content}
                >
                    <span className={styles.greeting}>Hi, I'm</span>
                    <h1 className={styles.title}>Biprodeep Nath</h1>
                    <h2 className={styles.subtitle}>Student. Developer. Thinker.</h2>
                    <p className={styles.description}>
                        I craft digital experiences with code and curiosity.
                        Exploring the intersection of technology and creativity.
                    </p>

                    <div className={styles.ctaGroup}>
                        <Link href="/projects" className={styles.primaryBtn}>
                            View Work
                        </Link>
                        <Link href="/contact" className={styles.secondaryBtn}>
                            Contact Me
                        </Link>
                    </div>

                    <div className={styles.socials}>
                        <a href="https://github.com/bipash25" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaGithub />
                        </a>
                        <a href="https://twitter.com/theBIPRO" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com/in/biprodeep-nath" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaLinkedin />
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className={styles.scrollIndicator}
            >
                <FaArrowDown />
            </motion.div>
        </section>
    );
}
