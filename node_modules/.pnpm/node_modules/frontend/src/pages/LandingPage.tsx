// apps/frontend/src/app/landing/LandingPage.tsx
import Hero from '../components/landing/Hero';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/NavBar';
// import Video from '../components/landing/Video'; // Supprimé
import About from '../components/landing/About'; // Ajouté
import Testimonials from '../components/landing/Testimonials';
import '../styles/landing/landing.scss';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Testimonials/>
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;