import { ArticleEntity } from '@app/article/article.entity';

export interface ArticleResponse {
  article: ArticleEntity;
}

export interface ArticlesResponse {
  articles: ArticleEntity[];
  articlesCount: number;
}
