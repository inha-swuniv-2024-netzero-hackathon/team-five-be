import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AwsService } from 'src/common/aws/aws.service';
import { AwsModule } from 'src/common/aws/aws.module';
import { PrismaModule } from 'src/common/prisma/primsa.module';

@Module({
  imports: [AwsModule, PrismaModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
