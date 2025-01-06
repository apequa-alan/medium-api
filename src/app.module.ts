import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { dataSource } from '../db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource), TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
