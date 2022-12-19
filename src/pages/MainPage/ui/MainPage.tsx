import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widget/Page';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page data-testid="MainPage">
      {t('Главная')}
    </Page>
  );
};

export default MainPage;
