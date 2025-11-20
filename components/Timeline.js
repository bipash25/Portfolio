'use client';

import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

const Timeline = ({ events }) => {
    return (
        <div className={styles.timeline}>
            {events.map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${styles.container} ${index % 2 === 0 ? styles.left : styles.right}`}
                >
                    <div className={styles.content}>
                        <h3 className={styles.year}>{event.year}</h3>
                        <h4 className={styles.title}>{event.title}</h4>
                        <p className={styles.description}>{event.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline;
