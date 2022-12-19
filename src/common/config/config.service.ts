import { Injectable } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly config: Config) {}

  get MONGO_URL(): string {
    return (
      this.config.get<string>('MONGO_URL') ||
      'mongodb://localhost:27017/eve_data'
    );
  }

  get ES_URL(): string {
    return this.config.get<string>('ES_URL') || 'http://localhost:9200';
  }

  get ES_TIMEOUT(): number {
    return this.config.get<number>('ES_TIMEOUT') || 5000;
  }

  get ES_CONTACT_INDEX(): string {
    return this.config.get<string>('ES_CONTACT_INDEX') || 'contacts';
  }
}
