import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import ProjectCard from '@/components/ProjectCard';
import styles from './projects.module.css';

export const metadata = {
    title: 'Projects | Biprodeep Nath',
    description: 'A showcase of my coding projects and experiments.',
};

export const dynamic = 'force-dynamic';

async function getProjects() {
    await dbConnect();
    const projects = await Project.find({}).sort({ stars: -1, updatedAt: -1 }).lean();

    return projects.map(p => ({
        ...p,
        _id: p._id.toString(),
        createdAt: p.createdAt?.toString(),
        updatedAt: p.updatedAt?.toString(),
    }));
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>My Projects</h1>
                <p className={styles.subtitle}>Things I've built to learn and solve problems.</p>
            </section>

            {projects.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No projects found. They might be syncing from GitHub...</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </main>
    );
}
