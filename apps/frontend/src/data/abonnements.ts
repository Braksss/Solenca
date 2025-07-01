export const abonnements = [
  {
    id: 'solenca-one',
    name: 'Solenca One',
    basePrice: 99,
    tagline: '2 visites par mois pour surveiller l’essentiel, sans superflu.',
    features: [
      { id: 'visite-base', label: '2 visites par mois', included: true },
      { id: 'rapport', label: 'Rapport photo à chaque passage', included: true },
      { id: 'alerte', label: 'Alerte en cas d’anomalie', included: true },
      { id: 'visite-extra-1', label: '+1 visite / mois', included: false, price: 45 },
      { id: 'visite-extra-2', label: '+2 visites / mois', included: false, price: 90 },
      { id: 'visite-extra-3', label: '+3 visites / mois', included: false, price: 135 },
      { id: 'visite-extra-4', label: '+4 visites / mois', included: false, price: 180 },
      { id: 'visite-extra-5', label: '+5 visites / mois', included: false, price: 225 },
      { id: 'module-piscine', label: 'Module Piscine', included: false, price: 89 },
      { id: 'module-jardin', label: 'Module Jardin', included: false, price: 89 },
      { id: 'module-hiver', label: 'Module Hiver+', included: false, price: 29 },
      { id: 'module-surveillance', label: 'Module Surveillance+', included: false, price: 19 },
    ],
  },
];

