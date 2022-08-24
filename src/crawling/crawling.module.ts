import { CrawlingRepository } from './crawling.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CrawlingController } from './crawling.controller';
import { CrawlingService } from './crawling.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([CrawlingRepository]),
    ScheduleModule.forRoot(),
  ],
  controllers: [CrawlingController],
  providers: [CrawlingService],
})
export class CrawlingModule {}
