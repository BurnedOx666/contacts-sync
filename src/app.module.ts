import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PixelModule } from './pixel/pixel.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@common/config/config.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      imports: [CommonModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.MONGO_URL,
      }),
    }),
    PixelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
