import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import slugify from 'slugify';

import { CreateArticleDto } from '@app/article/dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleEntity } from '@app/article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleResponse } from '@app/article/types';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async createArticle(
    currentUser: UserEntity,
    payload: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const newArticle = new ArticleEntity();
    Object.assign(newArticle, payload);
    if (!newArticle.tagList) {
      newArticle.tagList = [];
    }
    newArticle.slug = this.getSlug(newArticle.title);
    newArticle.author = currentUser;
    return await this.articleRepository.save(newArticle);
  }

  private getSlug(title: string): string {
    return `${slugify(title, {
      lower: true,
    })}-${((Math.random() * Math.pow(36, 6)) | 0).toString()}`;
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponse {
    return {
      article,
    };
  }
}
