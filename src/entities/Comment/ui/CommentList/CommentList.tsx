import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../../ui/CommentCard/CommentCard';
import cls from './CommentList.module.scss';
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
      <div className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            className={cls.comment}
            comment={comment}
            isLoading={isLoading}
            key={comment.id}
          />
        ))
        : <Text text={t('Комментарии отсутствуют')} />}
    </div>
  );
});
