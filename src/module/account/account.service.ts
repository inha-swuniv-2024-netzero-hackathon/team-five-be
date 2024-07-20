import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(id: string) {
    const idx = await this.prisma.account.create({
      data: {
        id: id,
        qr: 'dummy',
        latitude: '1',
        longtitude: '1',
        coo: 1,
      },
      select: {
        idx: true,
      },
    });
    return idx;
  }

  async duplicate(id: string) {
    const findId = await this.prisma.account.findFirst({
      where: {
        id: id,
      },
    });
    if (findId) {
      throw new ConflictException('already id exist');
    }
  }
  async selectPosition(userIdx: number) {
    const position = await this.prisma.account.findFirst({
      select: {
        latitude: true,
        longtitude: true,
      },
      where: {
        idx: userIdx,
      },
    });
    return position;
  }
  async selectQr(userIdx: number) {
    const qr = await this.prisma.account.findFirst({
      select: {
        qr: true,
      },
      where: {
        idx: userIdx,
      },
    });
    return qr;
  }
  async selectUser(userIdx: number) {
    const data = await this.prisma.account.findFirst({
      where: {
        idx: userIdx,
      },
    });
    return data;
  }

  async selectCoo(userIdx: number) {
    const coo = await this.prisma.account.findFirst({
      select: {
        coo: true,
      },
      where: {
        idx: userIdx,
      },
    });
    return coo;
  }
  async create() {
    await this.prisma.account.create({
      data: {
        id: 'back',
        qr: 'qr',
        longtitude: '37.451165',
        latitude: '126.6570101',
      },
    });
  }
}
