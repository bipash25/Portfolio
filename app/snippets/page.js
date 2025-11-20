import styles from './snippets.module.css';
import { snippets } from '@/lib/snippetsData';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export const metadata = {
  title: 'Snippets | Biprodeep Nath',
  description: 'Useful code snippets and solutions.',
};

export default function Snippets() {
  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.title}>Code Snippets</h1>
        <p className={styles.subtitle}>Bits of code I find useful.</p>
      </section>

      <div className={styles.listContainer}>
        {snippets.map((snippet) => (
          <Link key={snippet.id} href={`/snippets/${snippet.id}`} className={styles.listItem}>
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{snippet.title}</h3>
              <p className={styles.itemSummary}>{snippet.summary}</p>
              <span className={styles.itemLang}>{snippet.language}</span>
            </div>
            <div className={styles.itemIcon}>
              <FaChevronRight />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
