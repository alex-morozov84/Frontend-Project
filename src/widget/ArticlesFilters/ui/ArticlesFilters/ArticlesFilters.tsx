import {memo} from 'react'
import {useTranslation} from 'react-i18next';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesFilters.module.scss'
import {Card} from "@/shared/ui/redesigned/Card";
import {ArticleSortSelector} from "@/features/ArticleSortSelector";
import {ArticleTypeTabs} from "@/features/ArticleTypeTabs";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {ArticleSortField, ArticleType} from "@/entities/Article";
import {SortOrder} from "@/shared/types/sort";
import {Input} from "@/shared/ui/redesigned/Input";
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesFiltersProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
  type: ArticleType
  search: string
  onChangeSearch: (value: string) => void
  onChangeType: (type: ArticleType) => void
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {className, sort, onChangeSort, onChangeType, onChangeSearch, search, onChangeOrder, order, type} = props
  const {t} = useTranslation();

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding='24'
    >
      <VStack gap='32'>
        <Input
          value={search}
          size='s'
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
          addonLeft={<Icon Svg={SearchIcon}/>}
        />
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeSort={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
      </VStack>
    </Card>
  );
});