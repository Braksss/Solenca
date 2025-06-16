import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AbonnementPage from '../src/pages/abonnement';
import './styles/landing/landing.scss';  // import global
import PrecommandePage from '../src/pages/precommande';  

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/abonnement" element={<AbonnementPage />} />
        <Route path="/precommande" element={<PrecommandePage />} /> {/* Route précommande */}
        {/* <Route path="/services" element={<ServicesPage />} /> etc. */}
      </Routes>
    </BrowserRouter>
  );
}
