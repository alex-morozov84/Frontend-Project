import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widget/Page'
import { VStack } from '@/shared/ui/Stack'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { articleDetailsPageReducer } from '../../model/slices'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleRating } from '@/features/articleRating'
import { getFeatureFlags } from '@/shared/lib/features'
import { Counter } from '@/entities/Counter'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesDetailsPage: articleDetailsPageReducer,
}

export const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled')
  const isCounterEnabled = getFeatureFlags('isCounterEnabled')
  console.log(isArticleRatingEnabled)

  if (!id) {
    return null
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          {isArticleRatingEnabled && <ArticleRating articleId={id} />}
          {isCounterEnabled && <Counter />}
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
