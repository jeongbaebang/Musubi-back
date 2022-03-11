import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello MusBi! + 7';
  }
  async getCrawling() {
    const getHtml = async (URL: string) => {
      try {
        return await axios.get(URL);
      } catch (error) {
        console.error(error);
      }
    };

    const getRootOk = async ({ data }) => {
      const ulList: { listId: string }[] = [];
      const $ = cheerio.load(data);
      const $bodyList = $('div.gathering-panel ul li').find('span.article-id');

      $bodyList.each(function (i) {
        ulList[i] = {
          listId: $(this).text().substring(1),
        };
      });

      return ulList;
    };

    const getRootChild = async (data: { listId: string }[]) => {
      const contentList = [];

      const prom = data.map(async ({ listId }) => {
        return await getHtml(`https://okky.kr/article/${listId}`);
      });

      for (const [index, value] of prom.entries()) {
        const $ = cheerio.load((await value).data);
        const $bodyList = $('#content-body');

        contentList[index] = {
          num: index,
          title: $bodyList.find('h2.panel-title').text(),
          content: $bodyList.children('article').html(),
        };
      }
      return contentList;
    };

    const html = await getHtml('https://okky.kr/articles/gathering');
    const listId = await getRootOk(html);
    return getRootChild(listId);
  }
}
