import { Content } from './crawing.types';
import { TMI_OTH_PRJ_M } from './crawling.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TMI_OTH_PRJ_M)
export class CrawlingRepository extends Repository<TMI_OTH_PRJ_M> {
  async createCrawlingData({
    V_OTH_PRJ_ID,
    V_OTH_TITLE,
    T_OTH_CONTENT,
    V_SITE_GUBUN,
    V_OTH_URL,
    V_REG_NM,
    D_REG_DTM,
  }: Content): Promise<void> {
    const contentItem = this.create({
      V_OTH_PRJ_ID,
      V_OTH_TITLE,
      T_OTH_CONTENT,
      V_SITE_GUBUN,
      V_OTH_URL,
      V_REG_NM,
      D_REG_DTM,
    });

    await this.save(contentItem);
  }
  async deleteAllData(): Promise<void> {
    await this.clear();
  }

  async getInFlearnData() {
    return await this.find({ V_SITE_GUBUN: 'I' });
  }
  async getOkkyData() {
    return await this.find({ V_SITE_GUBUN: 'O' });
  }
  async selectAllData() {
    return await this.find();
  }
}
