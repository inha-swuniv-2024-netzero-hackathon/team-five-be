import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigProvider } from 'src/common/aws/config/multer.config';
import { AwsService } from 'src/common/aws/aws.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly awsService: AwsService,
  ) {}
  @Post('/')
  @UseInterceptors(FileInterceptor('image', multerConfigProvider('img')))
  async upload(
    @UploadedFile('file', ParseFilePipe) file?: Express.Multer.File,
  ) {
    const url = await this.awsService.uploadImage(file);
    return url;
  }
}
