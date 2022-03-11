import { Content } from './crawing.types';
import { Crawling } from './crawling.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Crawling)
export class CrawlingRepository extends Repository<Crawling> {
  async createContent({ id, title, content }: Content): Promise<void> {
    const currentTime = new Date();
    const contentItem = this.create({ id, title, content, currentTime });

    await this.save(contentItem);
  }
}
