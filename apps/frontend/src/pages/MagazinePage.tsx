import React, { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/magazinepage.scss';

// Images (placeholders, remplacer par du contenu Solenca réel)
import cover1 from '../assets/hero.png';
import authorAvatar from '../assets/hero.png';

const ARTICLES = [
  {
    id: 1,
    cover: cover1,
    category: 'Conseils Maison',
    catColor: '#ffb347',
    title: 'Comment préparer votre maison secondaire avant l été',
    excerpt: 'Les étapes essentielles à suivre pour garantir une résidence prête, propre et sereine.',
    author: 'Solenca Team',
    date: 'Juin 18, 2025',
  },
  {
    id: 2,
    cover: cover1,
    category: 'Entretien',
    catColor: '#80d16d',
    title: 'Check-list mensuelle pour une résidence sans surprise',
    excerpt: 'Une routine simple à mettre en place pour assurer la longévité de votre bien.',
    author: 'Solenca Team',
    date: 'Juin 10, 2025',
  },
  {
    id: 3,
    cover: cover1,
    category: 'Investissement',
    catColor: '#7b8bff',
    title: 'Pourquoi entretenir, c’est valoriser',
    excerpt: 'Une maison bien suivie se vend mieux. Découvrez comment Solenca peut vous y aider.',
    author: 'Solenca Team',
    date: 'Mai 28, 2025',
  },
  {
    id: 4,
    cover: cover1,
    category: 'Vie locale',
    catColor: '#ffc04d',
    title: 'Les meilleurs artisans à Platja d’Aro',
    excerpt: 'Notre sélection de partenaires fiables pour vos petits ou gros travaux.',
    author: 'Solenca Team',
    date: 'Mai 15, 2025',
  },
];

const MagazinePage: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <>
      <Navbar />

      <main className="magazine-page">
        <span className="badge-top">Le Journal</span>

        <h1 className="magazine-title">Nos derniers articles & conseils</h1>
        <p className="magazine-subtitle">
          Découvrez les coulisses de Solenca, nos recommandations pour une maison mieux gérée, et des idées pour profiter pleinement de votre bien secondaire.
        </p>

        <form
          className="magazine-search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>

        <section className="magazine-grid">
          {filtered.map((a) => (
            <article key={a.id} className="mag-card">
              <img src={a.cover} alt={a.title} className="mag-cover" />

              <div className="mag-content">
                <span className="mag-category" style={{ background: a.catColor }}>
                  {a.category}
                </span>

                <h3 className="mag-heading">{a.title}</h3>
                <p className="mag-excerpt">{a.excerpt}</p>

                <div className="mag-meta">
                  <img src={authorAvatar} alt={a.author} />
                  <span>{a.author}</span>
                  &nbsp;&middot;&nbsp;
                  <time>{a.date}</time>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MagazinePage;
