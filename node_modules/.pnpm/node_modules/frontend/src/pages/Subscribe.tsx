// apps/frontend/src/pages/Subscribe.tsx
import axios from 'axios';
import { useState } from 'react';

export default function Subscribe() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/payments/create-checkout-session', {
        priceId: 'price_XXX',      // remplace par ton Price ID
        email: 'user@example.com', // remplace par l’email du user authentifié
      });
      window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Chargement…' : 'Je m’abonne'}
    </button>
  );
}
