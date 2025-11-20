'use client';

import styles from './RichTextEditor.module.css';

export default function RichTextEditor({ value, onChange, placeholder }) {
    return (
        <div className={styles.editorWrapper}>
            <textarea
                className={styles.editor}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    minHeight: '300px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--foreground)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
                * Rich Text Editor is temporarily disabled due to React 19 incompatibility. Markdown is supported.
            </p>
        </div>
    );
}
