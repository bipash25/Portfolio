'use client';

import styles from './TechMarquee.module.css';
import {
    FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaAws
} from 'react-icons/fa';
import {
    SiNextdotjs, SiMongodb, SiTailwindcss, SiTypescript, SiFramer, SiGraphql, SiPostgresql
} from 'react-icons/si';

const techStack = [
    { icon: FaReact, name: 'React' },
    { icon: SiNextdotjs, name: 'Next.js' },
    { icon: FaNodeJs, name: 'Node.js' },
    { icon: SiTypescript, name: 'TypeScript' },
    { icon: FaJs, name: 'JavaScript' },
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiPostgresql, name: 'PostgreSQL' },
    { icon: FaPython, name: 'Python' },
    { icon: SiTailwindcss, name: 'Tailwind' },
    { icon: SiFramer, name: 'Framer Motion' },
    { icon: FaHtml5, name: 'HTML5' },
    { icon: FaCss3Alt, name: 'CSS3' },
    { icon: FaGitAlt, name: 'Git' },
    { icon: FaDocker, name: 'Docker' },
    { icon: FaAws, name: 'AWS' },
    { icon: SiGraphql, name: 'GraphQL' },
];

export default function TechMarquee() {
    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
                {/* Render twice for seamless loop */}
                {[...techStack, ...techStack].map((tech, index) => (
                    <div key={index} className={styles.techItem}>
                        <tech.icon className={styles.icon} />
                        <span className={styles.name}>{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
