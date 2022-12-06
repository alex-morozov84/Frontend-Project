import { useTranslation } from 'react-i18next';
import { Page } from '@/widget/Page/Page';

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      {t('У вас нет доступа к этой странице')}
    </Page>
  );
};
export default ForbiddenPage;
