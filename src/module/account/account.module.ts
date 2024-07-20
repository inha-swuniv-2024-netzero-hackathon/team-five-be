import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaModule } from 'src/common/prisma/primsa.module';

@Module({
  imports: [PrismaModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
