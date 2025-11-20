import Timeline from '@/components/Timeline';
import HobbyCard from '@/components/HobbyCard';
import SkillGroup from '@/components/SkillGroup';
import styles from './about.module.css';
import { FaCode, FaDatabase, FaTools, FaMusic, FaAtom, FaBrain } from 'react-icons/fa';
import { SiPython, SiJavascript, SiReact, SiNextdotjs, SiMongodb, SiPostgresql, SiDocker, SiGit } from 'react-icons/si';

export const metadata = {
    title: 'About Me | Biprodeep Nath',
    description: 'My journey, skills, and interests beyond code.',
};

export default function About() {
    const timelineEvents = [
        { year: '2015', title: 'First Encounter', description: 'Discovered the world of electronics through my mother\'s first Android smartphone.' },
        { year: '2016', title: 'Multiplayer Magic', description: 'Learned about LAN multiplayer in Mini Militia, sparking curiosity about connectivity.' },
        { year: '2017', title: 'The "Hack" Quest', description: 'Started researching game modification to get in-game items, discovering the concept of "hacking".' },
        { year: '2020', title: 'Lockdown & Servers', description: 'Dove into Minecraft servers, Discord bots, and started learning Python.' },
        { year: '2023', title: 'Web Development', description: 'Completed CodeWithHarry\'s Web Dev course and started building real projects.' },
        { year: 'Present', title: 'Continuous Learning', description: 'Exploring Next.js, Cloud, and building a digital identity.' },
    ];

    const skills = {
        languages: [
            { name: 'Python', icon: <SiPython /> },
            { name: 'JavaScript', icon: <SiJavascript /> },
        ],
        frameworks: [
            { name: 'React', icon: <SiReact /> },
            { name: 'Next.js', icon: <SiNextdotjs /> },
        ],
        tools: [
            { name: 'MongoDB', icon: <SiMongodb /> },
            { name: 'PostgreSQL', icon: <SiPostgresql /> },
            { name: 'Docker', icon: <SiDocker /> },
            { name: 'Git', icon: <SiGit /> },
        ],
    };

    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>About Me</h1>
                <p className={styles.subtitle}>My journey through code and curiosity.</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>My Story</h2>
                <Timeline events={timelineEvents} />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>My Toolkit</h2>
                <div className={styles.skillsContainer}>
                    <SkillGroup title="Languages" skills={skills.languages} />
                    <SkillGroup title="Frameworks" skills={skills.frameworks} />
                    <SkillGroup title="Tools & Databases" skills={skills.tools} />
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Beyond Code</h2>
                <div className={styles.hobbiesGrid}>
                    <HobbyCard
                        title="Science Enthusiast"
                        icon={<FaAtom />}
                        description="Fascinated by the fundamental laws of the universe and scientific discovery."
                    />
                    <HobbyCard
                        title="Philosophical Thinker"
                        icon={<FaBrain />}
                        description="Enjoy pondering deep questions about existence, consciousness, and society."
                    />
                    <HobbyCard
                        title="Music & Singing"
                        icon={<FaMusic />}
                        description="I love singing (even if I'm not a pro!) and exploring different genres of music."
                    />
                </div>
            </section>
        </main>
    );
}
