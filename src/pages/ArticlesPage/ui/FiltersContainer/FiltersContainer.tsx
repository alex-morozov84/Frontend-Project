import {memo} from 'react'
import {ArticlesFilters} from "@/widget/ArticlesFilters";
import {useArticleFilters} from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string
}

export const FiltersContainer = memo(({className}: FiltersContainerProps) => {

  const {order, sort, search, type, onChangeSort, onChangeOrder, onChangeSearch, onChangeType} = useArticleFilters()

  return (
    <ArticlesFilters
      className={className}
      search={search}
      sort={sort}
      type={type}
      order={order}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
      onChangeSearch={onChangeSearch}
      onChangeOrder={onChangeOrder}
    />
  );
});