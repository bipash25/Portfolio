'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
                <div className={styles.grid}></div>
            </div>

            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={styles.textContent}
                >
                    <motion.span
                        className={styles.greeting}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Hello, World! I'm
                    </motion.span>

                    <h1 className={styles.title}>
                        <span className={styles.name}>BIPRODEEP</span>
                        <span className={styles.surname}>NATH</span>
                    </h1>

                    <motion.div
                        className={styles.roles}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <span>Student</span>
                        <span className={styles.dot}>•</span>
                        <span>Developer</span>
                        <span className={styles.dot}>•</span>
                        <span>Thinker</span>
                    </motion.div>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        Crafting digital experiences with code, curiosity, and a touch of philosophy.
                        Exploring the intersection of technology and the universe.
                    </motion.p>

                    <motion.div
                        className={styles.cta}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <Link href="/projects" className={styles.primaryBtn}>
                            View My Work <FaArrowRight />
                        </Link>
                        <Link href="/contact" className={styles.secondaryBtn}>
                            Let's Talk
                        </Link>
                    </motion.div>

                    <motion.div
                        className={styles.socials}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <a href="https://github.com/bipash25" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/biproo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaLinkedin />
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.visual}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    {/* Abstract Code/Tech Visual */}
                    <div className={styles.codeBlock}>
                        <div className={styles.codeHeader}>
                            <span className={styles.codeDot}></span>
                            <span className={styles.codeDot}></span>
                            <span className={styles.codeDot}></span>
                        </div>
                        <pre className={styles.codeContent}>
                            <code>
                                <span className={styles.k}>const</span> <span className={styles.v}>developer</span> = {'{'}
                                {'\n'}  <span className={styles.p}>name</span>: <span className={styles.s}>'Biprodeep Nath'</span>,
                                {'\n'}  <span className={styles.p}>age</span>: <span className={styles.n}>16</span>,
                                {'\n'}  <span className={styles.p}>passion</span>: [<span className={styles.s}>'Code'</span>, <span className={styles.s}>'Science'</span>],
                                {'\n'}  <span className={styles.f}>build</span>: () ={'>'} {'{'}
                                {'\n'}    <span className={styles.k}>return</span> <span className={styles.s}>'Awesome Stuff'</span>;
                                {'\n'}  {'}'}
                                {'\n'}{'}'}
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>

            <div className={styles.scrollDown}>
                <span>Scroll</span>
                <div className={styles.scrollLine}></div>
            </div>
        </section>
    );
};

export default Hero;
