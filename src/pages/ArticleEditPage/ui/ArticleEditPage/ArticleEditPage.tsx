import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widget/Page/Page';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{id: string}>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit
        ? t(`Редактирование статьи с ID = ${id}`)
        : t('Создание новой статьи')}
    </Page>
  );
});

export default ArticleEditPage;
