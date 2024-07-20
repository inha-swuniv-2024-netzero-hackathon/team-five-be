import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductList(storeIdx: number) {
    const data = this.prisma.product.findMany({
      where: {
        store_idx: storeIdx,
      },
      orderBy: {
        price: 'desc',
      },
    });
    return data;
  }
}
