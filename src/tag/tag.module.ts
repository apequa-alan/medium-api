import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagService } from '@app/tag/tag.service';
import { TagController } from '@app/tag/tag.controller';
import { TagEntity } from '@app/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
