import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { notFound } from 'next/navigation';
import styles from './project-detail.module.css';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaStar, FaCodeBranch } from 'react-icons/fa';
import CommentSection from '@/components/CommentSection';
import StarButton from '@/components/StarButton';

export const dynamic = 'force-dynamic';

async function getProject(slug) {
    await dbConnect();
    // Try to find by slug first, then by name (slugified logic fallback if needed)
    let project = await Project.findOne({ slug }).lean();

    if (!project) {
        // Fallback: try to find by name if slug matches name-slug
        // This is a simple fallback, might need more robust logic
        const projects = await Project.find({}).lean();
        project = projects.find(p =>
            (p.slug === slug) ||
            (p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
        );
    }

    if (!project) return null;

    return {
        ...project,
        _id: project._id.toString(),
        createdAt: project.createdAt?.toString(),
        updatedAt: project.updatedAt?.toString(),
    };
}

export default async function ProjectDetail({ params }) {
    const project = await getProject(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className={styles.container}>
            <Link href="/projects" className={styles.backLink}>
                <FaArrowLeft /> Back to Projects
            </Link>

            <div className={styles.header}>
                <h1 className={styles.title}>{project.name}</h1>
                <div className={styles.links}>
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                            <FaGithub /> GitHub
                        </a>
                    )}
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                            <FaExternalLinkAlt /> Live Demo
                        </a>
                    )}
                </div>
            </div>

            <div className={styles.stats}>
                <StarButton projectId={project._id} initialStars={project.stars} />
                <div className={styles.stat}>
                    <FaCodeBranch /> {project.forks} Forks
                </div>
                {project.language && (
                    <div className={styles.stat}>
                        <span className={styles.languageDot}></span> {project.language}
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.description}>
                    <h2>About this Project</h2>
                    <p>{project.description}</p>
                </div>

                <div className={styles.techStack}>
                    <h2>Tech Stack</h2>
                    <div className={styles.tags}>
                        {project.topics?.map((topic, index) => (
                            <span key={index} className={styles.tag}>{topic}</span>
                        ))}
                    </div>
                </div>
            </div>

            <CommentSection projectId={project._id} />
        </main>
    );
}
