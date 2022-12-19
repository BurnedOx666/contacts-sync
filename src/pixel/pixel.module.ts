import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserContact, UserContactSchema } from '@schema/user_contact.schema';
import { PixelController } from './pixel.controller';
import { PixelService } from './pixel.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: UserContact.name, schema: UserContactSchema },
    ]),
  ],
  controllers: [PixelController],
  providers: [PixelService],
})
export class PixelModule {}
