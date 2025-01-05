import { Controller, Get, Module } from '@nestjs/common';

import { TagService } from '@app/tag/tag.service';

@Module({})
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('')
  async getAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    return { tags: tags.map((item) => item.name) };
  }
}
