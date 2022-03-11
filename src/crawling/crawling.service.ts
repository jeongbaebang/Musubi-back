import { ContentList } from './crawing.types';
import { Injectable } from '@nestjs/common';

import * as cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class CrawlingService {
  private async getHtml(URL: string) {
    return await axios.get(URL);
  }

  private $(data: string | cheerio.Node | cheerio.Node[] | Buffer) {
    return cheerio.load(data);
  }

  startCrawling() {
    const getListId = ({ data }) => {
      const listId: { listId: string }[] = [];

      this.$(data)('div.gathering-panel ul li')
        .find('span.article-id')
        .each((i, el) => {
          listId[i] = {
            listId: this.$(el).text().substring(1),
          };
        });

      return listId;
    };

    const getDetailContentList = async (data: { listId: string }[]) => {
      const detailContentList: ContentList[] = [];

      const pending = data.map(({ listId }) =>
        this.getHtml(`https://okky.kr/article/${listId}`),
      );

      (await Promise.all(pending)).forEach(({ data }, index) => {
        const $bodyList = this.$(data)('#content-body');

        detailContentList[index] = {
          id: index,
          title: $bodyList.find('h2.panel-title').text(),
          content: $bodyList.children('article').html(),
        };
      });

      return detailContentList;
    };

    return this.getHtml('https://okky.kr/articles/gathering')
      .then(getListId)
      .then(getDetailContentList)
      .catch(console.error);
  }
}
