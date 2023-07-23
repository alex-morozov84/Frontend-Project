import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widget/Page'
import { ArticlesPageFilter } from '../ArticlesPageFilters/ArticlesPageFilter'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'
import { ArticlePageGreeting } from '@/features/articlePageGreeting'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        data-testid="ArticlesPage"
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilter />
        <ArticleInfiniteList className={cls.list} />
        <ArticlePageGreeting />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
