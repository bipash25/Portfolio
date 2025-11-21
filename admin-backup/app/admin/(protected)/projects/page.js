import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Link from 'next/link';
import styles from './projects.module.css';
import { FaPlus, FaEdit, FaTrash, FaGithub } from 'react-icons/fa';

async function getProjects() {
    await dbConnect();
    const projects = await Project.find({}).sort({ stars: -1 });
    return projects;
}

export default async function AdminProjects() {
    const projects = await getProjects();

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Manage Projects</h1>
                <Link href="/admin/projects/new" className={styles.createBtn}>
                    <FaPlus /> Custom Project
                </Link>
            </div>

            <div className={styles.list}>
                {projects.map((project) => (
                    <div key={project._id} className={styles.item}>
                        <div>
                            <h3 className={styles.projectTitle}>
                                {project.name}
                                {project.isCustom && <span className={styles.badge}>Custom</span>}
                            </h3>
                            <p className={styles.desc}>{project.description.substring(0, 60)}...</p>
                        </div>
                        <div className={styles.actions}>
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                                    <FaGithub />
                                </a>
                            )}
                            <Link href={`/admin/projects/${project._id}`} className={styles.actionBtn}>
                                <FaEdit />
                            </Link>
                            <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
