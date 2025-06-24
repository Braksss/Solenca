import fetch from 'node-fetch';
import 'dotenv/config';

const API_TOKEN = process.env.STRAPI_API_TOKEN;

const abonnements = [
  {
    title: 'Tranquilo',
    slug: 'tranquilo',
    price: 129,
    visitsPerMonth: 4,
    tagline: 'Pour garder un œil sur votre maison, toute l’année',
    feature: [
      { label: '1 passage par semaine (30 min max)', included: true },
      { label: 'Vidage boîte aux lettres', included: true },
      { label: 'Aération et contrôle humidité', included: true },
      { label: 'Balayage de l’allée / entrée', included: true },
      { label: 'Vérification post-tempête si nécessaire', included: true },
      { label: 'Rapport après chaque visite', included: true },

      // Upsells disponibles pour tous
      { label: 'Assistance cambriolage', included: false, price: 19 },
      { label: 'Ouverture saisonnière', included: false, price: 29 },
      { label: 'Vérification post-location', included: false, price: 24 },
      { label: 'Lavage haute pression', included: false, price: 39 }
    ]
  },
  {
    title: 'Confianza',
    slug: 'confianza',
    price: 229,
    visitsPerMonth: 4,
    tagline: 'Un vrai entretien hebdo, pour une maison toujours prête',
    feature: [
      { label: 'Tous les services Tranquilo', included: true },
      { label: 'Nettoyage terrasse / mobilier', included: true },
      { label: 'Entretien jardin léger', included: true },
      { label: 'Nettoyage piscine avant arrivée', included: true },
      { label: 'Ouverture maison pour artisans', included: true },
      { label: 'Réception colis', included: true },
      { label: 'Durée de passage : 1h', included: true },

      { label: 'Assistance cambriolage', included: false, price: 19 },
      { label: 'Ouverture saisonnière', included: false, price: 29 },
      { label: 'Vérification post-location', included: false, price: 24 },
      { label: 'Lavage haute pression', included: false, price: 39 }
    ]
  },
  {
    title: 'Serenidad',
    slug: 'serenidad',
    price: 349,
    visitsPerMonth: 5,
    tagline: 'Le service renforcé pour les propriétaires exigeants',
    feature: [
      { label: 'Tous les services Confianza', included: true },
      { label: '5 passages/mois (7 en juillet/août)', included: true },
      { label: 'Ménage complet avant séjour', included: true },
      { label: 'Remise de clés à vos invités', included: true },
      { label: 'Assistance cambriolage (1er niveau)', included: true },
      { label: 'Ouverture/fermeture maison saisonnière', included: true },
      { label: 'Vérification post-location', included: true },
      { label: 'Lavage haute pression (terrasse, allée)', included: true }
    ]
  }
];

const importAbonnements = async () => {
  for (const abonnement of abonnements) {
    try {
      const res = await fetch('http://localhost:1337/api/abonnements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: abonnement }),
      });

      const json = await res.json();

      if (res.ok) {
        console.log(`✅ Ajouté : ${abonnement.title}`);
      } else {
        console.error(`❌ Erreur pour ${abonnement.title} :`, json?.error?.message);
      }
    } catch (err) {
      console.error(`💥 Erreur fatale pour ${abonnement.title} :`, err.message);
    }
  }
};

importAbonnements();
