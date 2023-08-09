import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Card } from '@/shared/ui/deprecated/Card'
import { Input } from '@/shared/ui/deprecated/Input'
import { SortOrder } from '@/shared/types/sort'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlePageSelectors'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import cls from './ArticlesPageFilter.module.scss'
import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'

interface ArticlesPageFilterProps {
  className?: string
}

export const ArticlesPageFilter = memo(
  ({ className }: ArticlesPageFilterProps) => {
    const { t } = useTranslation()
    const view = useSelector(getArticlesPageView)
    const dispatch = useAppDispatch()
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
      },
      [dispatch],
    )

    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData],
    )

    const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData],
    )

    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlesPageActions.setSearch(search))
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchData()
      },
      [dispatch, debouncedFetchData],
    )

    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value as ArticleType))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData],
    )

    return (
      <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeOrder={onChangeOrder}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t('Поиск')}
          />
        </Card>
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
      </div>
    )
  },
)
