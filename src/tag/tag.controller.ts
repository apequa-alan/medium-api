import { Controller, Get, Module } from '@nestjs/common';

import { TagService } from '@app/tag/tag.service';

@Module({})
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('')
  getAll() {
    return this.tagService.findAll();
  }
}
