import React from 'react';
import '../shared/banniere.scss';

type BanniereProps = {
  title: string;
  subtitle?: string;
};

const Banniere = ({ title, subtitle }: BanniereProps) => {
  return (
    <div className="banniere">
      <div className="banniere__content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default Banniere;
