import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widget/Page/Page';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { EditableProfileCard } from 'features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

interface ProfilePageProps {
  className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
  const { t } = useTranslation('profile');
  const { id } = useParams<{id: string}>();
  const { className } = props;

  if (!id) {
    return <Text text={t('Профиль не найден')} />;
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
