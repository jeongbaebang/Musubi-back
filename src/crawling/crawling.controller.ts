import { CrawlingService } from './crawling.service';
import { Controller, Get } from '@nestjs/common';

@Controller('crawling')
export class CrawlingController {
  constructor(private crawlingService: CrawlingService) {}

  @Get('/okky')
  okkyStartCrawling() {
    return this.crawlingService.okkyStartCrawling();
  }

  @Get('/inflearn')
  inflearnStartCrawling() {
    return this.crawlingService.inflearnStartCrawling();
  }
}
