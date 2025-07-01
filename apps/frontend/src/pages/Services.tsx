// apps/frontend/src/pages/Services.tsx
import { useEffect, useState } from 'react';
import { strapi } from '../../../../packages/lib/api';

interface Service {
  id: string;
  attributes: {
    title: string;
    description: string;
    image?: { data: { attributes: { url: string } } };
  };
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
     strapi.get('/services?populate=image').then(response => {
          setServices(response.data.data as Service[]);
        });
        
  }, []);

  return (
    <div>
      <h1>Ce que nous faisons pour vous</h1>
      {services.map(({ id, attributes }) => (
        <div key={id} className="service-card">
          <h2>{attributes.title}</h2>
          <p>{attributes.description}</p>
          {attributes.image && (
            <img src={attributes.image.data.attributes.url} alt={attributes.title} />
          )}
        </div>
      ))}
    </div>
  );
}
