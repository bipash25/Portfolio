'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={styles.card}
        >
            <div className={styles.header}>
                <h3 className={styles.title}>{project.name}</h3>
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

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <FaStar className={styles.starIcon} />
                    <span>{project.stars}</span>
                </div>
                <div className={styles.stat}>
                    <FaCodeBranch className={styles.forkIcon} />
                    <span>{project.forks}</span>
                </div>
            </div>

            <div className={styles.techStack}>
                {project.techStack && project.techStack.map((tech, index) => (
                    <span key={index} className={styles.tech}>{tech}</span>
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
