import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {Card} from '@/shared/ui/deprecated/Card'
import {Input} from '@/shared/ui/deprecated/Input'
import cls from './ArticlesPageFilter.module.scss'
import {ArticleSortSelector} from '@/features/ArticleSortSelector'
import {ArticleViewSelector} from '@/features/ArticleViewSelector'
import {ArticleTypeTabs} from '@/features/ArticleTypeTabs'
import {useArticleFilters} from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFilterProps {
  className?: string
}

export const ArticlesPageFilter = memo(
  ({className}: ArticlesPageFilterProps) => {
    const {t} = useTranslation()

    const {order, sort, search, type, view, onChangeSort, onChangeOrder, onChangeView, onChangeSearch, onChangeType} = useArticleFilters()

    return (
      <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeOrder={onChangeOrder}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView}/>
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
