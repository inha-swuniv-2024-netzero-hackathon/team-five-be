import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { StoreService } from './service/store.service';
import { ProductService } from './service/product.service';
import { ApiTags } from '@nestjs/swagger';

const userIdx = 1;
@ApiTags('store api')
@Controller('store')
export class StoreController {
  constructor(
    private readonly storeSerivice: StoreService,
    private readonly productService: ProductService,
  ) {}

  @Get('/distance')
  async getStoreByDistance() {
    const storeData = this.storeSerivice.findStoreByDistance(userIdx);
    return storeData;
  }

  @Get('/score')
  async getStoreByScore() {
    const storeData = this.storeSerivice.findStoreByScore(userIdx);
    return storeData;
  }
  @Post('/dummy')
  async createDummy() {
    await this.storeSerivice.createDummy();
    return {
      message: 'success',
    };
  }
  /**
   *
   * 점포 정보와 거기서파는 상품들
   */
  @Get('/:storeIdx')
  async getStoreData(@Param('storeIdx', ParseIntPipe) storeIdx: number) {
    const storeData = await this.storeSerivice.findStoreData(storeIdx);
    const productData = await this.productService.findProductList(storeIdx);
    const replyData = await this.storeSerivice.findReplyByStore(storeIdx);
    return {
      storeData: storeData,
      productData: productData,
      replyData: replyData,
    };
  }
}
