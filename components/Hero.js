'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Animated Gradient Background */}
            <div className={styles.gradientBg}></div>

            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={styles.content}
                >
                    <motion.span
                        className={styles.greeting}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Hey there! 👋 I'm
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Biprodeep Nath
                    </motion.h1>

                    <motion.div
                        className={styles.roles}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <span>Student</span>
                        <span className={styles.separator}>•</span>
                        <span>Developer</span>
                        <span className={styles.separator}>•</span>
                        <span>Thinker</span>
                    </motion.div>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        Crafting digital experiences with code, curiosity, and a dash of creativity.
                        Passionate about building things that make a difference.
                    </motion.p>

                    <motion.div
                        className={styles.ctaGroup}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        <Link href="/projects" className={styles.primaryBtn}>
                            View My Work <FaArrowRight />
                        </Link>
                        <Link href="/contact" className={styles.secondaryBtn}>
                            Get in Touch
                        </Link>
                    </motion.div>

                    <motion.div
                        className={styles.socials}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                    >
                        <a href="https://github.com/bipash25" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaGithub />
                        </a>
                        <a href="https://twitter.com/theBIPRO" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com/in/biprodeep-nath" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaLinkedin />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats or Quick Info */}
            <motion.div
                className={styles.stats}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
            >
                <div className={styles.stat}>
                    <span className={styles.statNumber}>2+</span>
                    <span className={styles.statLabel}>Years Coding</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statNumber}>20+</span>
                    <span className={styles.statLabel}>Projects Built</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statNumber}>∞</span>
                    <span className={styles.statLabel}>Ideas Brewing</span>
                </div>
            </motion.div>
        </section>
    );
}
