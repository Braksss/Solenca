import React, { useState } from 'react';
import '../styles/dashboard.scss';
import placeholderImage from '../assets/image-left.jpg';
import {
  MdHomeRepairService,
  MdPool,
  MdGrass,
  MdPhotoCamera,
  MdCalendarMonth,
  MdInsights,
  MdNotificationsNone,
  MdChatBubbleOutline
} from 'react-icons/md';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('Tableau de bord');


  return (
    <div className="dashboard-container">
      <div className="header-background" />

      <header className="dashboard-header">
        <div className="header-left">
          <span className="logo-icon">★</span>
          <span className="logo-text">Solenca</span>
        </div>
        <nav className="header-menu">
        </nav>
        <div className="header-right">
          <MdNotificationsNone size={20} className="icon" />
          <MdChatBubbleOutline size={20} className="icon" />
          <button className="upload-btn">Nouveau ticket</button>
          <img className="avatar" src={placeholderImage} alt="User Avatar" />
        </div>
      </header>

      <div className="profile-wrapper">
        <section className="profile-bar">
          <div className="profile-info">
            <img className="profile-photo" src={placeholderImage} alt="Photo Maison" />
            <div className="profile-meta">
              <h2>
                Claire Dupont <span className="pro-badge">MEMBRE</span>
              </h2>
              <p>Résidence secondaire à S’Agaró – Vue mer</p>
              <div className="profile-actions">
                <button className="btn-follow">Voir mes prestations</button>
                <button className="btn-contact">Contacter Solenca</button>
              </div>
            </div>
          </div>
          <div className="profile-stats">
            <div className="badges">
              <div className="stats-badge orange">8</div>
              <div className="stats-badge purple">2</div>
              <div className="stats-badge black">34</div>
            </div>
            <div className="numbers">
              <div>
                <label>Interventions</label>
                <strong>8</strong>
              </div>
              <div>
                <label>Alertes</label>
                <strong>2</strong>
              </div>
              <div>
                <label>Photos</label>
                <strong>34</strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      <nav className="secondary-nav">
        <span className={activeTab === 'Tableau de bord' ? 'active' : ''} onClick={() => setActiveTab('Tableau de bord')}>Tableau de bord</span>
        <span className={activeTab === 'Interventions' ? 'active' : ''} onClick={() => setActiveTab('Interventions')}>Interventions</span>
        <span className={activeTab === 'Photos' ? 'active' : ''} onClick={() => setActiveTab('Photos')}>Photos</span>
        <span className={activeTab === 'Support' ? 'active' : ''} onClick={() => setActiveTab('Support')}>Support</span>
      </nav>

      {activeTab === 'Tableau de bord' && (
      <section className="project-grid">
        <div className="project-card">
          <div className="project-card__media">
            <img src={placeholderImage} alt="Illustration" />
            <span className="project-card__badge">Service</span>
          </div>
          <h3>Nettoyage piscine après orage</h3>
          <p className="tags">Piscine</p>
        </div>

        <div className="project-card">
          <div className="project-card__media">
            <img src={placeholderImage} alt="Illustration" />
            <span className="project-card__badge">Inspection</span>
          </div>
          <h3>Inspection terrain & portail</h3>
          <p className="tags">Extérieur</p>
        </div>

        <div className="project-card">
          <div className="project-card__media">
            <img src={placeholderImage} alt="Illustration" />
            <span className="project-card__badge">Document</span>
          </div>
          <h3>Rapport complet – Juin</h3>
          <p className="tags">Rapport</p>
        </div>
      </section>
      )}

{activeTab === 'Interventions' && (
  <section className="interventions-section">
    <h2>Historique des interventions</h2>
    <ul className="intervention-list">
      <li>27 juin – Remise en route du système d’arrosage automatique</li>
      <li>21 juin – Révision de la pompe piscine</li>
      <li>15 juin – Nettoyage toiture + gouttières</li>
    </ul>
  </section>
)}

{activeTab === 'Photos' && (
  <section className="photos-section">
    <h2>Galerie photos</h2>
    <div className="photo-grid">
      <img src={placeholderImage} alt="Illustration" />
      <img src={placeholderImage} alt="Illustration" />
      <img src={placeholderImage} alt="Illustration" />
    </div>
  </section>
)}

{activeTab === 'Support' && (
  <section className="support-section">
    <h2>Assistance Solenca</h2>
    <p>Besoin d’aide ou de signaler un problème ?</p>
    <div className="support-actions">
      <button className="upload-btn">Nouveau ticket</button>
      <p>Consultez ci-dessous l’état de vos demandes en cours :</p>
      <ul className="ticket-list">
        <li><strong>[En attente]</strong> – Demande de vérification de la clôture de jardin</li>
        <li><strong>[Résolu]</strong> – Fuite d’eau signalée le 12 juin</li>
        <li><strong>[En cours]</strong> – Programmation alarme hors gel</li>
      </ul>
    </div>
  </section>
)}
    </div>
  );
};

export default DashboardLayout;
