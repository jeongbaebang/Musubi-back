import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlingController } from './crawling/crawling.controller';
import { CrawlingModule } from './crawling/crawling.module';

@Module({
  imports: [CrawlingModule],
  controllers: [AppController, CrawlingController],
  providers: [AppService],
})
export class AppModule {}
