// apps/frontend/src/app/landing/LandingPage.tsx
import Hero from '../components/landing/Hero';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/NavBar';
// import Video from '../components/landing/Video'; // Supprimé
import About from '../components/landing/About'; // Ajouté
import Testimonials from '../components/landing/Testimonials';
import Banner from '../components/landing/Banner'; // Ajout Banner fixe
import { Helmet } from 'react-helmet'; // Ajout pour SEO
import '../styles/landing/landing.scss';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Solenca : Gestion Biens Secondaires Platja d'Aro | Costa Brava</title>
        <meta name="description" content="Sérénité totale pour votre villa secondaire. Visites hebdo, entretien jardin/piscine, rapports photo. Devis gratuit pour proprios et agences loc." />
        {/* Ajoute autres metas comme keywords, OG pour FB shares */}
      </Helmet>
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <CTASection />
      <Footer />
      <Banner /> {/* Bannière fixe ajoutée ici */}
    </>
  );
};

export default LandingPage;