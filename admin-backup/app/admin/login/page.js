'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });

        if (result.error) {
            setError('Invalid credentials');
        } else {
            router.push('/admin');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Admin Login</h1>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.group}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.btn}>Login</button>
            </form>
        </div>
    );
}
