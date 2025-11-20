'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        });
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.floating : ''}`}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        BIPRO<span className={styles.dot}>.</span>
                    </Link>

                    <div className={styles.mobileIcon} onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
                        <li className={styles.navItem}>
                            <Link href="/about" className={styles.navLink} onClick={toggleMenu}>
                                About
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/projects" className={styles.navLink} onClick={toggleMenu}>
                                Projects
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/blogs" className={styles.navLink} onClick={toggleMenu}>
                                Blogs
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/snippets" className={styles.navLink} onClick={toggleMenu}>
                                Snippets
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/contact" className={styles.navLink} onClick={toggleMenu}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Overlay for mobile menu */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
                onClick={toggleMenu}
            />
        </>
    );
};

export default Navbar;
