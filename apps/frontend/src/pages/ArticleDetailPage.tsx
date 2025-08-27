import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; // Assurez-vous d'avoir installé : npm install react-markdown
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import SocialShareButtons from '../components/shared/SocialShareButtons';
import '../styles/pages/articledetailpage.scss';

// On importe nos articles
import { articles } from '../data/articles';

const ArticleDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    
    // On trouve l'article correspondant au slug dans notre tableau
    const article = articles.find(a => a.slug === slug);

    // Si l'article n'est pas trouvé, on peut rediriger vers une page 404 ou la liste des articles
    if (!article) {
        return <Navigate to="/articles" />;
    }

    const articleUrl = window.location.href;

    return (
        <>
            <Helmet><title>{article.title} | Solenca</title></Helmet>
            <Navbar />
            <main className="article-detail-page">
                <header className="article-header">
                    <div className="header-image">
                        <img src={article.cover_image} alt={article.title} />
                    </div>
                    <div className="shell header-content">
                        <span className="category">{article.category}</span>
                        <h1>{article.title}</h1>
                        <span className="date">Publié le {new Date(article.publication_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                </header>

                <div className="shell article-body">
                    <article className="article-content">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </article>
                    <aside className="article-sidebar">
                        <SocialShareButtons url={articleUrl} title={article.title} />
                        {/* Vous pourrez ajouter d'autres éléments ici (articles similaires, etc.) */}
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ArticleDetailPage;