'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Snippets', href: '/snippets' },
        { name: 'Guestbook', href: '/guestbook' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        BIPRO<span className={styles.dot}>.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className={styles.desktopMenu}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className={styles.themeToggleWrapper}>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className={styles.mobileToggle} onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className={styles.mobileThemeToggle}>
                                <ThemeToggle />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Overlay for mobile menu */}
            {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
        </>
    );
};

export default Navbar;
