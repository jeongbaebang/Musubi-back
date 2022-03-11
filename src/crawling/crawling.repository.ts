import { Crawling } from './crawling.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Crawling)
export class CrawlingRepository extends Repository<Crawling> {}
