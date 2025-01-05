import { Module } from '@nestjs/common';

import { TagService } from '@app/tag/tag.service';
import { TagController } from '@app/tag/tag.controller';
import { tagProviders } from '@app/tag/tag.providers';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TagService, ...tagProviders],
  controllers: [TagController],
})
export class TagModule {}
