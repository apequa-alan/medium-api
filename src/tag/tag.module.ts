import { Module } from '@nestjs/common';

import { TagService } from '@app/tag/tag.service';
import { TagController } from '@app/tag/tag.controller';

@Module({
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
