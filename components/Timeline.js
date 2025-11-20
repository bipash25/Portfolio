'use client';

import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

const Timeline = ({ events }) => {
    return (
        <div className={styles.timeline}>
            <div className={styles.line}></div>
            {events.map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`${styles.container} ${index % 2 === 0 ? styles.left : styles.right}`}
                >
                    <div className={styles.content}>
                        <div className={styles.dateBadge}>{event.year}</div>
                        <h4 className={styles.title}>{event.title}</h4>
                        <p className={styles.description}>{event.description}</p>
                        <span className={styles.dot}></span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline;
