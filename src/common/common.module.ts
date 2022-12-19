import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search/search.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.registerAsync({
      imports: [CommonModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.ES_URL,
        requestTimeout: configService.ES_TIMEOUT,
        maxRetries: 10,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    ConfigService,
    SearchService,
  ],
  exports: [
    ConfigService,
    SearchService,
  ],
})
export class CommonModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}

  async onModuleInit() {
    await this.searchService.createIndex();
  }
}
