import styles from './snippets.module.css';

const snippets = [
    {
        id: 1,
        title: 'MongoDB Connection',
        language: 'javascript',
        code: `import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;`
    },
    {
        id: 2,
        title: 'React Custom Hook: useLocalStorage',
        language: 'javascript',
        code: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}`
    }
];

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

            <div className={styles.grid}>
                {snippets.map((snippet) => (
                    <div key={snippet.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{snippet.title}</h3>
                            <span className={styles.lang}>{snippet.language}</span>
                        </div>
                        <pre className={styles.codeBlock}>
                            <code>{snippet.code}</code>
                        </pre>
                    </div>
                ))}
            </div>
        </main>
    );
}
