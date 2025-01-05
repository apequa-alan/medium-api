import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TagEntity } from '@app/tag/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_REPOSITORY')
    private tagRepository: Repository<TagEntity>,
  ) {}
  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }
}
