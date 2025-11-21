'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck } from 'react-icons/fa';
import styles from './CodeBlock.module.css';

export default function CodeBlock({ language, value }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.language}>{language || 'code'}</span>
                <button onClick={handleCopy} className={styles.copyBtn} title="Copy code">
                    {copied ? <FaCheck className={styles.checkIcon} /> : <FaCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.5)',
                    fontSize: '0.9rem',
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
}
