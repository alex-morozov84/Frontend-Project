import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
  fetchArticleRecommendations,
} from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
  ArticleDetailsRecommendationsSchema,
} from '../types/ArticleDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articlesDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendationsSlice',
  initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: ['1', '2'],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsPageRecommendationsReducer } = articleDetailsPageRecommendationsSlice;
