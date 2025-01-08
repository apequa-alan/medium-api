import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import slugify from 'slugify';

import { CreateArticleDto } from '@app/article/dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleEntity } from '@app/article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleResponse, ArticlesResponse } from '@app/article/types';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: any): Promise<ArticlesResponse> {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    queryBuilder.orderBy('articles.created_at', 'DESC');
    const articlesCount = await queryBuilder.getCount();

    if (query.tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.author) {
      const author = await this.userRepository.findOne({
        where: { username: query.author },
      });
      if (author) {
        queryBuilder.andWhere('articles.authorId = :id', {
          id: author.id,
        });
      }
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const articles = await queryBuilder.getMany();

    return {
      articles,
      articlesCount,
    };
  }

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

  async findArticleBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({
      where: {
        slug,
      },
    });
  }

  async deleteArticle(userId: number, slug: string): Promise<DeleteResult> {
    const article = await this.findArticleBySlug(slug);
    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }
    if (userId !== article.author.id) {
      throw new HttpException('You are not author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    userId: number,
    slug: string,
    updateUserDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.findArticleBySlug(slug);
    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }
    if (userId !== article.author.id) {
      throw new HttpException('You are not author', HttpStatus.FORBIDDEN);
    }
    Object.assign(article, updateUserDto);

    return await this.articleRepository.save(article);
  }

  async addArticleToFavorites(
    userId: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.findArticleBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const isNotFavorite = !user.favorites.find(
      (articleInFavorites) => articleInFavorites.id === article.id,
    );
    if (isNotFavorite) {
      user.favorites.push(article);
      article.favoritesCount++;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }

  async removeArticleFromFavorites(
    userId: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.findArticleBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const favoriteIndex = user.favorites.findIndex(
      (articleInFavorites) => articleInFavorites.id === article.id,
    );
    if (favoriteIndex >= 0) {
      user.favorites.splice(favoriteIndex, 1);
      article.favoritesCount--;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponse {
    return {
      article,
    };
  }
}
