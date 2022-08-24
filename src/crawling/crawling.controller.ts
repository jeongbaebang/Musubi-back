import { CrawlingService } from './crawling.service';
import { Controller, Get, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller('crawling')
export class CrawlingController {
  constructor(
    private crawlingService: CrawlingService,
    private scheduler: SchedulerRegistry,
  ) {}

  @Get('/start')
  start() {
    const job = this.scheduler.getCronJob('crawlingSchedule');

    job.start();
    console.log('crawlingSchedule start! ', job.lastDate());
  }

  @Get('/stop')
  stop() {
    const job = this.scheduler.getCronJob('crawlingSchedule');

    job.stop();
    console.log('crawlingSchedule stopped! ', job.lastDate());
  }

  @Get('/dataAll')
  dataAll() {
    return this.crawlingService.selectAllData();
  }

  @Get('/dataOkky')
  dataOkky() {
    return this.crawlingService.getOkkyData();
  }

  @Get('/dataInflearn')
  dataInflearn() {
    return this.crawlingService.getInFlearnData();
  }
}
