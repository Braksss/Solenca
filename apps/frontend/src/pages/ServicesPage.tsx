import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/NavBar';
import Footer from '../components/landing/Footer';
import '../styles/pages/servicespage.scss';
import { Home, Droplet, Key, Star, Briefcase, Tool, Users, ChevronDown, Wind, Camera, Package } from 'react-feather';
import heroImg from '../assets/service-hero.png';

const ServicesFAQ: React.FC = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const faqData = t('faq', { returnObjects: true }) as { question: string, answer: string }[];
    const toggle = (index: number) => setActiveIndex(activeIndex === index ? null : index);

    if (!Array.isArray(faqData)) return null;

    return (
        <section className="services-faq">
            <div className="shell">
                <h2>{t('services_page.faq_title')}</h2>
                <p className="faq-intro">{t('services_page.faq_intro')}</p>
                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <div className="faq-item" key={index}>
                            <div className="faq-question" onClick={() => toggle(index)}>
                                <span className="faq-text">{faq.question}</span>
                                <ChevronDown className={`faq-toggle ${activeIndex === index ? 'open' : ''}`} />
                            </div>
                            <div className={`faq-answer ${activeIndex === index ? 'visible' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServicesPage: React.FC = () => {
    const { t } = useTranslation();
    const privateCards = t('services_page.private_cards', { returnObjects: true }) as { icon: string, title: string, text: string }[];
    const proCards = t('services_page.pro_cards', { returnObjects: true }) as { icon: string, title: string, text: string }[];

    const iconMap: { [key: string]: React.ReactNode } = {
        Home: <Home />, Droplet: <Droplet />, Key: <Key />, Star: <Star />, Wind: <Wind />,
        Briefcase: <Briefcase />, Tool: <Tool />, Users: <Users />, Camera: <Camera />, Package: <Package/>
    };

    return (
        <>
            <Helmet>
                <title>{t('services_page.seo_title')}</title>
            </Helmet>
            <Navbar />
            <main className="services-page">
                {/* HERO */}
                <section className="services-hero">
                    <div className="shell">
                        <div className="hero-content">
                            <h1>{t('services_page.hero_title')}</h1>
                            <p>{t('services_page.hero_subtitle')}</p>
                            <div className="cta-row">
                                <Link className="primary-btn" to="/abonnement">{t('services_page.hero_cta')}</Link>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="hero-image">
                                <img src={heroImg} alt="Villa en bord de mer" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLOC PARTICULIERS */}
                <section className="features-block">
                    <div className="shell">
                        <div className="block-top">
                            <div className="block-top__left">
                                <h2>{t('services_page.private_title')}</h2>
                            </div>
                            <div className="block-top__right">
                                <p>{t('services_page.private_desc')}</p>
                                <Link className="block-btn" to="/abonnement">{t('services_page.private_cta')}</Link>
                            </div>
                        </div>
                        <div className="block-cards">
                            {privateCards.map((card, index) => (
                                <div className="feature-card" key={index}>
                                    <div className="feature-icon">{iconMap[card.icon]}</div>
                                    <h3>{card.title}</h3>
                                    <p>{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* QUOTE */}
                <section className="quote-section">
                    <div className="shell">
                        <p>“{t('services_page.quote')}”</p>
                        <span>— {t('services_page.quote_author')}</span>
                    </div>
                </section>

                {/* BLOC PRO */}
                <section className="features-block pro-block">
                    <div className="shell">
                        <div className="pro-badge">B2B</div>
                        <div className="block-top">
                            <div className="block-top__left">
                                <h2>{t('services_page.pro_title')}</h2>
                            </div>
                            <div className="block-top__right">
                                <p>{t('services_page.pro_desc')}</p>
                                <Link className="block-btn" to="/abonnement">{t('services_page.pro_cta')}</Link>
                            </div>
                        </div>
                        <div className="block-cards">
                            {proCards.map((card, index) => (
                                <div className="feature-card" key={index}>
                                    <div className="feature-icon">{iconMap[card.icon]}</div>
                                    <h3>{card.title}</h3>
                                    <p>{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ServicesFAQ />
            </main>
            <Footer />
        </>
    );
};

export default ServicesPage;