import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';

type Post = { id: string; title: string; excerpt: string; date: string; slug: string };

const DEMO_POSTS: Post[] = [
  { id: 'p1', title: 'Entretenir sa villa à distance : checklist utile', excerpt: 'Les 7 points à vérifier chaque mois pour éviter les mauvaises surprises.', date: '2025-08-15', slug: 'checklist-villa-distance' },
  { id: 'p2', title: 'Costa Brava : zones, prix et erreurs courantes', excerpt: 'Tour d’horizon rapide pour cadrer votre projet sereinement.', date: '2025-08-10', slug: 'zones-prix-erreurs' }
];

function BlogPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('blog.metaTitle')}</title>
        <meta name="description" content={t('blog.metaDescription') || ''} />
      </Helmet>

      <Navbar />
      <main className="page page--blog container" style={{ padding: '2rem 0' }}>
        <h1>{t('blog.title')}</h1>
        <p className="muted">{t('blog.subtitle')}</p>

        <div className="teasers-grid" style={{ marginTop: '1.25rem' }}>
          {DEMO_POSTS.map(post => (
            <article key={post.id} className="teaser" style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '1rem' }}>
              <div className="teaser__meta" style={{ color: '#666', marginBottom: '.25rem' }}>{new Date(post.date).toLocaleDateString()}</div>
              <h3 className="teaser__title" style={{ margin: 0 }}>{post.title}</h3>
              <p style={{ color: '#444' }}>{post.excerpt}</p>
              <Link className="link-btn" to={`/blog/${post.slug}`}>{t('blog.readMore')} →</Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BlogPage;
