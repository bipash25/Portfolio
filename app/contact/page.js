'use client';

import styles from './contact.module.css';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert('Something went wrong.');
        } finally {
            if (status !== 'success') setStatus('');
        }
    };

    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h1 className={styles.title}>Get In Touch</h1>
                <p className={styles.subtitle}>Have a project in mind or just want to say hi?</p>
            </section>

            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.infoItem}>
                        <FaEnvelope className={styles.icon} />
                        <h3>Email Me</h3>
                        <a href="mailto:contact@bipro.dev">contact@bipro.dev</a>
                        <a href="mailto:bipro@bipro.dev">bipro@bipro.dev</a>
                    </div>
                    <div className={styles.infoItem}>
                        <FaPaperPlane className={styles.icon} />
                        <h3>Socials</h3>
                        <a href="https://instagram.com/the.bipro" target="_blank" rel="noopener noreferrer">@the.bipro (Instagram)</a>
                        <a href="https://t.me/theBIPRO" target="_blank" rel="noopener noreferrer">@theBIPRO (Telegram)</a>
                    </div>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your Email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={status === 'sending' || status === 'success'}>
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                    </button>
                </form>
            </div>
        </main>
    );
}
