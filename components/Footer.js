import styles from './Footer.module.css';
import { FaGithub, FaInstagram, FaTelegram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <SpotifyNowPlaying />
                </div>
                <div className={styles.socials}>
                    <a href="https://github.com/bipash25" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaGithub />
                    </a>
                    <a href="https://instagram.com/the.bipro" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaInstagram />
                    </a>
                    <a href="https://t.me/theBIPRO" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaTelegram />
                    </a>
                    <a href="https://x.com/the_bipro" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaTwitter />
                    </a>
                    <a href="https://www.linkedin.com/in/biproo" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaLinkedin />
                    </a>
                </div>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Biprodeep Nath. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
