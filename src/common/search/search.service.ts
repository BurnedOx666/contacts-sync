import { ConfigService } from '@common/config/config.service';
import { IEsContact } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ContactMapping } from './mappings';

@Injectable()
export class SearchService {
  constructor(
    private readonly es: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  public async createIndex() {
    const contactIndex = await this.es.indices.exists({
      index: this.configService.ES_CONTACT_INDEX,
    });

    if (!contactIndex) {
      await this.es.indices.create({
        index: this.configService.ES_CONTACT_INDEX,
        mappings: ContactMapping,
      });
    }
  }

  public async indexContacts(contacts: IEsContact[]) {
    const operations = contacts.flatMap((doc) => [
      { index: { _index: this.configService.ES_CONTACT_INDEX, _id: doc.id } },
      doc,
    ]);
    return this.es.bulk({ refresh: true, operations });
  }

  public async getContactsCount() {
    return this.es.count({ index: this.configService.ES_CONTACT_INDEX });
  }
}
