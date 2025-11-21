'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import styles from './ProjectCard.module.css';

import Link from 'next/link';

const ProjectCard = ({ project }) => {
    const slug = project.slug || project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className={styles.card}
        >
            <Link href={`/projects/${slug}`} className={styles.cardLink}>
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h3 className={styles.title}>{project.name}</h3>
                        {project.language && (
                            <span className={styles.languageBadge}>{project.language}</span>
                        )}
                    </div>
                    <div className={styles.links}>
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                                <FaGithub />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                                <FaExternalLinkAlt />
                            </a>
                        )}
                    </div>
                </div>

                <p className={styles.description}>{project.description}</p>

                <div className={styles.footer}>
                    <div className={styles.stats}>
                        <div className={styles.stat} title="Stars">
                            <FaStar className={styles.starIcon} />
                            <span>{project.stars}</span>
                        </div>
                        <div className={styles.stat} title="Forks">
                            <FaCodeBranch className={styles.forkIcon} />
                            <span>{project.forks}</span>
                        </div>
                    </div>

                    <div className={styles.techStack}>
                        {project.topics && project.topics.slice(0, 3).map((topic, index) => (
                            <span key={index} className={styles.tech}>{topic}</span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectCard;
