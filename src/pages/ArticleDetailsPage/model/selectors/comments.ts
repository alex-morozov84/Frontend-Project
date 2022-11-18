import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articlesDetailsPage?.comments.isLoading;
export const getArticleCommentsError = (state: StateSchema) => state.articlesDetailsPage?.recommendations?.error;
