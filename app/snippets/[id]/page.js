import { snippets } from '@/lib/snippetsData';
import styles from '../snippets.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const snippet = snippets.find((s) => s.id === id);
    if (!snippet) return { title: 'Snippet Not Found' };
    return {
        title: `${snippet.title} | Snippets`,
        description: snippet.summary,
    };
}

export default async function SnippetDetail({ params }) {
    const { id } = await params;
    const snippet = snippets.find((s) => s.id === id);

    if (!snippet) {
        notFound();
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/snippets" className={styles.backLink}>
                    <FaArrowLeft /> Back to Snippets
                </Link>

                <div className={styles.detailHeader}>
                    <h1 className={styles.detailTitle}>{snippet.title}</h1>
                    <span className={styles.langTag}>{snippet.language}</span>
                </div>

                <p className={styles.detailSummary}>{snippet.summary}</p>

                <div className={styles.codeWrapper}>
                    <pre className={styles.codeBlock}>
                        <code>{snippet.code}</code>
                    </pre>
                </div>
            </div>
        </main>
    );
}
