'use client';

import styles from './SkillGroup.module.css';

const SkillGroup = ({ title, skills }) => {
    return (
        <div className={styles.group}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.skills}>
                {skills.map((skill, index) => (
                    <div key={index} className={styles.skill}>
                        <span className={styles.icon}>{skill.icon}</span>
                        <span className={styles.name}>{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillGroup;
