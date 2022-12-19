import { SearchService } from '@common/search/search.service';
import { SerializersUtil } from '@common/utils/serializers.util';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserContact, UserContactDocument } from '@schema/user_contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class PixelService {
  constructor(
    private readonly searchService: SearchService,

    @InjectModel(UserContact.name)
    private readonly userContactModel: Model<UserContactDocument>,
  ) {}

  public async syncContacts() {
    const syncedContacts = await this.userContactModel.find().exec();

    Logger.log('Sync contacts : mongo data : ' + syncedContacts.length);

    const bulkResponse = await this.searchService.indexContacts(
      syncedContacts.map((c) => SerializersUtil.serializeContactDoc(c)),
    );

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
          });
        }
      });
      Logger.log('Sync errors', erroredDocuments);
    }

    const count = await this.searchService.getContactsCount();

    Logger.log('Sync contacts : indexed done : ' + count?.count);
  }
}
