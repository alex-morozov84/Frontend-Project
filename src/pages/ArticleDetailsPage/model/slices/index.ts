import { combineReducers } from '@reduxjs/toolkit'
import { articleDetailsPageRecommendationsReducer } from '../../model/slices/articleDetailsPageRecommendationsSlice'
import { articleDetailsCommentsReducer } from '../../model/slices/articleDetailsCommentsSlice'
import { ArticleDetailsPageSchema } from '../types'

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
  })
