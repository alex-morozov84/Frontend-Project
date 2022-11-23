import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { CommentCard } from '../../ui/CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
  const { t } = useTranslation();
  const {
    className,
    comments,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <VStack gap="16" className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            comment={comment}
            isLoading={isLoading}
            key={comment.id}
          />
        ))
        : <Text text={t('Комментарии отсутствуют')} />}
    </VStack>
  );
});
