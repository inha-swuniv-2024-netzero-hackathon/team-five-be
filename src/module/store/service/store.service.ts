import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async findStoreData(storeIdx: number) {
    const data = await this.prisma.store.findFirst({
      where: {
        idx: storeIdx,
      },
    });
    return data;
  }

  async findStoreByDistance(userIdx: number) {
    const storeData = await this.prisma.store.findMany({});
    const userData = await this.prisma.account.findFirst({
      where: {
        idx: userIdx,
      },
    });
    const userLatitude = parseFloat(userData.latitude);
    const userLongtitude = parseFloat(userData.longtitude);

    const storesWithDistance = storeData.map((store) => {
      const storeLatitude = parseFloat(store.latitude);
      const storeLongtitude = parseFloat(store.longtitude);

      const latitudeDifference = storeLatitude - userLatitude;
      const longtitudeDifference = storeLongtitude - userLongtitude;
      const distanceSquared =
        Math.pow(latitudeDifference, 2) + Math.pow(longtitudeDifference, 2);

      return {
        ...store,
        distanceSquared,
      };
    });

    storesWithDistance.sort((a, b) => a.distanceSquared - b.distanceSquared);

    return storesWithDistance;
  }

  async findStoreByScore(userIdx: number) {
    const storeData = await this.prisma.store.findMany({
      orderBy: {
        score: 'desc',
      },
    });
    return storeData;
  }

  async findReplyByStore(storeIdx: number) {
    const replyData = await this.prisma.reply.findMany({
      where: {
        store_idx: storeIdx,
      },
    });
    return replyData;
  }

  async createDummy() {
    const data = await this.prisma.store.create({
      data: {
        image: 'dummy image',
        name: 'xx카페',
        latitude: '37.451649',
        longtitude: '126.656530',
        address: '인천광역시 미추홀구 용현동 190-23',
        score: 4.56,
      },
      select: {
        idx: true,
      },
    });
    await this.prisma.product.create({
      data: {
        image: '상품 더미데이터',
        store_idx: data.idx,
        name: '카페라때',
        price: 3000,
        discount_price: 2500,
      },
    });
    await this.prisma.product.create({
      data: {
        image: '상품 더미데이터',
        store_idx: data.idx,
        name: '아메리카노',
        price: 2000,
        discount_price: 1500,
      },
    });
    await this.prisma.reply.create({
      data: {
        account_idx: 1,
        store_idx: data.idx,
        text: ' @@@@@@',
        score: 5,
      },
    });
  }
}
