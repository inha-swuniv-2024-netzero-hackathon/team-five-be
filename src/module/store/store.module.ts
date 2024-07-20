import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './service/store.service';
import { PrismaModule } from 'src/common/prisma/primsa.module';
import { ProductService } from './service/product.service';

@Module({
  imports: [PrismaModule],
  controllers: [StoreController],
  providers: [StoreService, ProductService],
})
export class StoreModule {}
