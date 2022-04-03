import { CrawlingRepository } from './crawling.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Content, ListId } from './crawing.types';

import * as cheerio from 'cheerio';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
@Injectable()
export class CrawlingService {
  constructor(
    @InjectRepository(CrawlingRepository)
    private crawlingRepository: CrawlingRepository,
  ) {}

  private async getHtml(URL: string) {
    return await axios.get(URL);
  }

  private $(data: string | cheerio.Node | cheerio.Node[] | Buffer) {
    return cheerio.load(data);
  }

  private convertFromStringToDate(responseDate) {
    const dateComponents = responseDate.split('T');
    const datePieces = dateComponents[0].split('-');
    const timePieces = dateComponents[1].split(':');
    return new Date(
      datePieces[0],
      datePieces[1] - 1,
      datePieces[2],
      timePieces[0],
      timePieces[1],
      timePieces[2],
    );
  }

  okkyStartCrawling() {
    const getListId = ({ data }) => {
      const listId: ListId[] = [];

      this.$(data)('div.gathering-panel ul li')
        .find('span.article-id')
        .each((i, el) => {
          listId[i] = {
            listId: this.$(el).text().substring(1),
          };
        });

      return listId;
    };

    const getDetailContentList = async (listid: ListId[]) => {
      const detailContentList: Content[] = [];

      const pending = listid.map(({ listId }) =>
        this.getHtml(`https://okky.kr/article/${listId}`),
      );

      (await Promise.all(pending)).forEach(({ data }, index) => {
        const $headerList = this.$(data)('.panel-heading');
        const $bodyList = this.$(data)('#content-body');
        console.log(listid[index].listId);
        detailContentList[index] = {
          V_OTH_PRJ_ID: uuid(),
          V_OTH_TITLE: $bodyList.find('h2.panel-title').text(),
          T_OTH_CONTENT: $bodyList.children('article').html(),
          V_SITE_GUBUN: 'O',
          V_OTH_URL: `https://okky.kr/article/${listid[index].listId}`,
          V_REG_NM: $headerList.find('.nickname').text(),
          D_REG_DTM: this.convertFromStringToDate(
            $headerList.find('.timeago').attr('title'),
          ),
        };
      });

      return detailContentList;
    };

    this.getHtml('https://okky.kr/articles/gathering')
      .then(getListId)
      .then(getDetailContentList)
      .then((items) => {
        items.forEach((item) => this.crawlingRepository.createContent(item));
      })
      .catch(console.error);
  }
}
