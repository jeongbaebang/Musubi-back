import { CrawlingService } from './crawling.service';
import { Controller } from '@nestjs/common';

@Controller('crawling')
export class CrawlingController {
  constructor(private crawlingService: CrawlingService) {}
}
