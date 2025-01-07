import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class ArticleService {
  createArticle() {
    return 'create article';
  }
}
