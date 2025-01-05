import { Module } from '@nestjs/common';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TagModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
