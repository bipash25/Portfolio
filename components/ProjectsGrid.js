'use client';

import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import styles from './ProjectsGrid.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsGrid({ projects }) {
    const [filter, setFilter] = useState('All');

    // Extract unique languages/topics for filter
    const languages = useMemo(() => {
        const langs = new Set(projects.map(p => p.language).filter(Boolean));
        return ['All', ...Array.from(langs)];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (filter === 'All') return projects;
        return projects.filter(p => p.language === filter);
    }, [projects, filter]);

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                {languages.map(lang => (
                    <button
                        key={lang}
                        onClick={() => setFilter(lang)}
                        className={`${styles.filterBtn} ${filter === lang ? styles.active : ''}`}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            <motion.div layout className={styles.grid}>
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className={styles.empty}>
                    No projects found for this filter.
                </div>
            )}
        </div>
    );
}
