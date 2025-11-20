'use client';

import { motion } from 'framer-motion';
import styles from './HobbyCard.module.css';

const HobbyCard = ({ title, icon, description }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={styles.card}
        >
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </motion.div>
    );
};

export default HobbyCard;
