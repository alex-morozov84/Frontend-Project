import { useTranslation } from 'react-i18next';
import { Page } from '@/widget/Page';

const AdminPanelPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="AdminPanelPage">
      {t('Админ панель')}
    </Page>
  );
};

export default AdminPanelPage;
