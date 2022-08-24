import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeORMConfig } from './configs/typeorm.config';
import { CrawlingModule } from './crawling/crawling.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), CrawlingModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
