import React, { useState } from 'react';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire
    // Par exemple, en utilisant une requête fetch vers votre backend.
    console.log('Données du formulaire:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="thank-you-message"><h3>Merci !</h3><p>Votre demande de devis a bien été envoyée. Nous vous contacterons très prochainement.</p></div>;
  }

  return (
    <div className="quote-form">
      <h3>Demandez votre devis personnalisé</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom complet</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Votre besoin</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Recevoir mon devis</button>
      </form>
    </div>
  );
};

export default QuoteForm;