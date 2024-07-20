import { Module } from '@nestjs/common';

import { StoreModule } from './module/store/store.module';
import { AccountModule } from './module/account/account.module';
import { AwsModule } from './common/aws/aws.module';
import { UploadModule } from './module/upload/upload.module';

@Module({
  imports: [StoreModule, AccountModule, AwsModule, UploadModule],
  providers: [],
})
export class AppModule {}
