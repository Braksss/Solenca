import React from 'react';
import '../../styles/landing/banner.scss';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className="banner-fixed">
      <span>{t('banner.text')}</span>
    </div>
  );
};

export default Banner;