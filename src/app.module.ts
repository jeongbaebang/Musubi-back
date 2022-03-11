import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { CrawlingController } from './crawling/crawling.controller';
import { CrawlingModule } from './crawling/crawling.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), CrawlingModule],
  controllers: [AppController, CrawlingController],
  providers: [AppService],
})
export class AppModule {}
