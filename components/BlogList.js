'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from '@/app/blogs/blogs.module.css';
import { FaSearch, FaTag } from 'react-icons/fa';

export default function BlogList({ initialBlogs }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);

    // Extract all unique tags from blogs
    const allTags = useMemo(() => {
        const tags = new Set();
        initialBlogs.forEach(blog => {
            blog.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [initialBlogs]);

    // Filter blogs based on search and tag
    const filteredBlogs = useMemo(() => {
        return initialBlogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
            return matchesSearch && matchesTag;
        });
    }, [initialBlogs, searchQuery, selectedTag]);

    return (
        <>
            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.tagCloud}>
                    <button
                        className={`${styles.tagBtn} ${!selectedTag ? styles.activeTag : ''}`}
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`${styles.tagBtn} ${selectedTag === tag ? styles.activeTag : ''}`}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No blogs found matching your criteria.</p>
                    <button
                        className={styles.resetBtn}
                        onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredBlogs.map((blog) => {
                        const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);
                        return (
                            <Link href={`/blogs/${blog.slug}`} key={blog._id} className={styles.card}>
                                <h2 className={styles.blogTitle}>{blog.title}</h2>
                                <p className={styles.excerpt}>{blog.content.substring(0, 150)}...</p>
                                <div className={styles.meta}>
                                    <div className={styles.metaLeft}>
                                        <span className={styles.date}>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className={styles.readTime}>{readingTime} min read</span>
                                    </div>
                                    <div className={styles.cardTags}>
                                        {blog.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}
