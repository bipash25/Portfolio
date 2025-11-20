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
        { year: '2015', title: 'The Spark', description: 'It started with my mother\'s Android phone. I was captivated by the idea that a device could hold a world of information.' },
        { year: '2016', title: 'Gaming & Connection', description: 'Multiplayer games like Mini Militia taught me the power of connectivity. I wanted to know how we could play together, miles apart.' },
        { year: '2020', title: 'The Builder\'s Mindset', description: 'Lockdown became my laboratory. I ran Minecraft servers, built Discord bots, and wrote my first lines of Python.' },
        { year: '2023', title: 'Full Stack Journey', description: 'I committed to the craft. From CodeWithHarry\'s tutorials to building complex web apps, I turned curiosity into capability.' },
        { year: 'Present', title: 'The Digital Philosopher', description: 'Now, I blend code with my love for science and philosophy, building digital experiences that matter.' },
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
            <section className={styles.hero}>
                <h1 className={styles.title}>More Than Just Code</h1>
                <p className={styles.subtitle}>I am a student of the universe, exploring the intersection of technology, science, and human thought.</p>
            </section>

            <section className={styles.philosophySection}>
                <div className={styles.philosophyContent}>
                    <FaAtom className={styles.philosophyIcon} />
                    <blockquote>
                        "The universe is written in the language of mathematics, but it is felt in the language of the soul."
                    </blockquote>
                    <p>
                        My journey isn't just about syntax and algorithms. It's about understanding the fundamental laws that govern our reality—from the subatomic particles to the vastness of the cosmos—and applying that structured thinking to solve human problems.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>My Origin Story</h2>
                <Timeline events={timelineEvents} />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>The Toolkit</h2>
                <div className={styles.skillsContainer}>
                    <SkillGroup title="Languages" skills={skills.languages} />
                    <SkillGroup title="Frameworks" skills={skills.frameworks} />
                    <SkillGroup title="Tools & Databases" skills={skills.tools} />
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Beyond the Screen</h2>
                <div className={styles.hobbiesGrid}>
                    <HobbyCard
                        title="Scientific Inquiry"
                        icon={<FaAtom />}
                        description="Diving deep into physics and astronomy. I believe understanding the 'why' is as important as the 'how'."
                    />
                    <HobbyCard
                        title="Philosophy"
                        icon={<FaBrain />}
                        description="Questioning existence, consciousness, and ethics. Technology without philosophy is a ship without a compass."
                    />
                    <HobbyCard
                        title="The Art of Sound"
                        icon={<FaMusic />}
                        description="Singing is my escape. It's where logic meets emotion, creating a harmony that code alone cannot achieve."
                    />
                </div>
            </section>
        </main>
    );
}
