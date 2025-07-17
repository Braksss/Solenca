import React, { useState } from 'react';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/magazinepage.scss';
import { Helmet } from 'react-helmet';

// Images (placeholders, remplacer par du contenu Solenca réel)
import cover1 from '../assets/hero.png';
import authorAvatar from '../assets/hero.png';

const ARTICLES = [
  {
    id: 1,
    cover: cover1,
    category: 'Conseils Maison',
    catColor: '#ffb347',
    title: 'Comment préparer votre villa secondaire en Costa Brava avant l’été',
    excerpt: 'Étapes essentielles pour une résidence prête, propre et sereine – tease pré-lancement Solenca novembre 2025 pour gestion auto.',
    author: 'Solenca Team',
    date: 'Juin 18, 2025',
  },
  {
    id: 2,
    cover: cover1,
    category: 'Entretien',
    catColor: '#80d16d',
    title: 'Check-list mensuelle pour une résidence sans surprise en Costa Brava',
    excerpt: 'Routine simple pour longévité de votre bien – pour proprios ou agences loc, réservez early pour novembre.',
    author: 'Solenca Team',
    date: 'Juin 10, 2025',
  },
  {
    id: 3,
    cover: cover1,
    category: 'Investissement',
    catColor: '#7b8bff',
    title: 'Pourquoi entretenir, c’est valoriser en Costa Brava',
    excerpt: 'Bien suivi se vend mieux – découvrez comment Solenca aide, avec Club off-market tease pour pré-lancement.',
    author: 'Solenca Team',
    date: 'Mai 28, 2025',
  },
  {
    id: 4,
    cover: cover1,
    category: 'Vie locale',
    catColor: '#ffc04d',
    title: 'Les meilleurs artisans en Costa Brava',
    excerpt: 'Sélection partners fiables pour travaux – idéal agences loc, pré-réservez Solenca pour novembre.',
    author: 'Solenca Team',
    date: 'Mai 15, 2025',
  },
  // Ajoute articles sans code change – just expand array
];

const MagazinePage = () => {
  const [query, setQuery] = useState('');

  const filtered = ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <>
      <Helmet>
        <title>Solenca Magazine : Conseils Gestion Biens Costa Brava</title>
        <meta name="description" content="Découvrez conseils entretien villa, investissements Costa Brava, vie locale. Pré-lancement Solenca novembre 2025 – sérénité pour proprios/agences loc." />
        {/* Keywords: "conseils gestion villa Costa Brava", "entretien piscine été", etc. */}
      </Helmet>
      <Navbar />

      <main className="magazine-page">
        <span className="badge-top">Le Journal</span>

        <h1 className="magazine-title">Nos derniers articles & conseils Costa Brava</h1>
        <p className="magazine-subtitle">
          Coulisses Solenca, recommandations pour maison mieux gérée, idées pour profiter de votre bien secondaire. Pré-lancement novembre 2025 – réservez early pour sérénité !
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
                   · 
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