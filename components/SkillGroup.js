'use client';

import { motion } from 'framer-motion';
import styles from './SkillGroup.module.css';

const SkillGroup = ({ title, skills }) => {
    return (
        <div className={styles.group}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.skills}>
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        className={styles.skill}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <span className={styles.icon}>{skill.icon}</span>
                        <span className={styles.name}>{skill.name}</span>
                        <div className={styles.glow}></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SkillGroup;
