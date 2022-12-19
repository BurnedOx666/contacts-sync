import 'dotenv/config';
import { Controller, Post, Res } from '@nestjs/common';
import { PixelService } from './pixel.service';
import { Response } from 'express';

@Controller('sync')
export class PixelController {
  constructor(private readonly pixelService: PixelService) {}

  @Post('contacts')
  syncContacts(@Res() res: Response) {
    this.pixelService.syncContacts();
    res.status(200).json({
      executed: true,
    });
  }
}
