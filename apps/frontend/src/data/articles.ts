// apps/frontend/src/data/articles.ts

// Pour les images, vous pouvez les importer directement
import articleImg1 from '../assets/blog/installation-cb.png';
import articleImg2 from '../assets/blog/vida-loca.png';
import articleImg3 from '../assets/blog/new-owner.png';

export interface Article {
    slug: string;
    title: string;
    category: string;
    publication_date: string;
    cover_image: string;
    excerpt: string;
    content: string; // Le contenu sera en format Markdown pour un formatage simple
}

export const articles: Article[] = [
    {
        slug: 'vivre-sur-la-costa-brava',
        title: "S'installer sur la Costa Brava : Le guide complet",
        category: 'Vie pratique',
        publication_date: '2025-08-27',
        cover_image: articleImg1,
        excerpt: "Découvrez les charmes et les défis de la vie sur la côte catalane. Un guide pour ceux qui rêvent de soleil, de mer et de culture.",
        content: `
## La douceur de vivre méditerranéenne

La Costa Brava est réputée pour ses paysages à couper le souffle, ses criques secrètes et son climat agréable toute l'année. La vie y est rythmée par le soleil et la mer, offrant un cadre idéal pour se détendre et profiter de la nature.

* **Gastronomie** : Savourez une cuisine riche en saveurs, basée sur les produits de la mer et du terroir.
* **Culture** : Imprégnez-vous de l'héritage de Salvador Dalí et des nombreux festivals locaux.
* **Activités** : Randonnée, sports nautiques, golf... les loisirs ne manquent pas.

## Les aspects pratiques

S'installer sur la Costa Brava demande une certaine préparation. Il est important de se renseigner sur le coût de la vie, qui peut varier considérablement d'une ville à l'autre, et sur les démarches administratives.

> **Conseil** : Apprendre quelques notions de catalan et d'espagnol facilitera grandement votre intégration et vos échanges avec les locaux.
        `
    },
    {
        slug: 'obtenir-le-nie-en-espagne',
        title: "Comment obtenir son NIE pour vivre en Espagne ?",
        category: 'Administratif',
        publication_date: '2025-08-20',
        cover_image: articleImg2,
        excerpt: "Le NIE est le sésame indispensable pour toute démarche en Espagne. Voici les étapes clés pour l'obtenir sans stress.",
        content: `
## Qu'est-ce que le NIE ?

Le *Número de Identificación de Extranjero* (NIE) est un numéro personnel, unique et exclusif que tout étranger doit posséder pour réaliser des démarches administratives et économiques en Espagne. Il est indispensable pour :

* Ouvrir un compte bancaire
* Signer un contrat de travail
* Acheter un bien immobilier
* Souscrire à des services (internet, électricité, etc.)

## La procédure étape par étape

L'obtention du NIE se fait auprès des services de l'immigration de la police nationale.

1.  **Prendre rendez-vous** (Cita Previa) en ligne sur le site officiel.
2.  **Remplir le formulaire EX-15** et le formulaire de taxe 790-012.
3.  **Préparer les documents** : passeport en cours de validité, justification de la demande (promesse de vente, contrat de travail...).
4.  **Se présenter au rendez-vous** avec tous les documents et le justificatif de paiement de la taxe.

> Le NIE vous est généralement délivré immédiatement ou sous quelques jours, selon la province. C'est une étape cruciale que nous pouvons faciliter grâce à nos services d'accompagnement.
        `
    },
    {
        slug: 'devenir-proprietaire-costa-brava',
        title: "Devenir propriétaire sur la Costa Brava : Nos conseils",
        category: 'Immobilier',
        publication_date: '2025-08-15',
        cover_image: articleImg3,
        excerpt: "Acheter une résidence sur la Costa Brava est un rêve accessible. Suivez nos conseils pour sécuriser votre investissement et faire le bon choix.",
        content: `
## 1. Définir son projet avec précision

Avant de vous lancer, prenez le temps de définir clairement vos critères :

* **Localisation** : Préférez-vous l'animation de Lloret de Mar, le charme de Cadaqués ou la tranquillité de Begur ?
* **Type de bien** : Appartement avec vue sur la mer, maison avec piscine, ou une *finca* traditionnelle à rénover ?
* **Budget** : N'oubliez pas d'inclure les frais annexes (taxes, notaire, avocat) qui représentent environ 10-15% du prix d'achat.

## 2. S'entourer des bons professionnels

Le marché immobilier espagnol a ses spécificités. Il est essentiel de vous faire accompagner.

> **Notre rôle** : En tant que chasseur immobilier et conseiller, nous vous aidons à naviguer le processus. Nous vérifions la conformité légale des biens (note simple, certificat énergétique...), nous négocions pour vous et nous vous mettons en relation avec des avocats et notaires de confiance.

## 3. Comprendre le processus d'achat

1.  **La réservation** (*reserva*) : Une petite somme pour retirer le bien du marché.
2.  **Le compromis de vente** (*contrato de arras*) : Un acompte de 10% est généralement versé.
3.  **L'acte de vente** (*escritura*) : La signature finale chez le notaire, qui officialise le transfert de propriété.

Investir sur la Costa Brava est une excellente décision, à condition d'être bien préparé.
        `
    }
];