import { CrawlingService } from './crawling.service';
import { Controller, Get } from '@nestjs/common';

@Controller('crawling')
export class CrawlingController {
  constructor(private crawlingService: CrawlingService) {}

  @Get('/test')
  test() {
    return this.crawlingService.startCrawling();
  }
}
