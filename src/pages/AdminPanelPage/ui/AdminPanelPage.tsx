import { useTranslation } from 'react-i18next';
import { Page } from '@/widget/Page/Page';

const AdminPanelPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      {t('Админ панель')}
    </Page>
  );
};

export default AdminPanelPage;
