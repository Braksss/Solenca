import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/blogindexpage.scss';

// On importe nos articles directement
import { articles, type Article } from '../data/articles';

const BlogIndexPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet><title>{t('blog_page.seo_title')}</title></Helmet>
            <Navbar />
            <main className="blog-index-page">
                <header className="blog-hero">
                    <div className="shell">
                        <h1>{t('blog_page.hero_title')}</h1>
                        <p>{t('blog_page.hero_subtitle')}</p>
                    </div>
                </header>

                <section className="shell articles-section">
                    <div className="articles-grid">
                        {articles.map(article => (
                            <Link to={`/articles/${article.slug}`} className="article-card" key={article.slug}>
                                <div className="card-image">
                                    <img src={article.cover_image} alt={article.title} />
                                </div>
                                <div className="card-content">
                                    <span className="card-category">{article.category}</span>
                                    <h3>{article.title}</h3>
                                    <p>{article.excerpt}</p>
                                    <span className="card-read-more">{t('blog_page.read_more')} →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BlogIndexPage;