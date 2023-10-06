import {memo, useCallback} from 'react'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ArticleAdditionalInfo} from "@/widget/ArticleAdditionalInfo";
import {Card} from '@/shared/ui/redesigned/Card';
import {getArticleDetailsData} from "@/entities/Article";
import cls from './AdditionalInfoContainer.module.scss'
import {getRouteArticleEdit} from "@/shared/const/router";

interface AdditionalInfoContainerProps {
  className?: string
}

export const AdditionalInfoContainer = memo(({className}: AdditionalInfoContainerProps) => {
  const article = useSelector(getArticleDetailsData)
  const navigate = useNavigate()

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id))
    }
  }, [article, navigate])

  if (!article) {
    return null
  }

  return (
    <Card padding='24' border='round' className={cls.card}>
      <ArticleAdditionalInfo
        className={className}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        onEdit={onEditArticle}
      />
    </Card>
  );
});