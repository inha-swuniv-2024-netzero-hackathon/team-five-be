import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { DuplicateDto } from './dto/duplicate.dto';
import { UserIdxDto } from './dto/user-idx.dto';

//const userIdx = 1;

interface Position {
  latitude: string;
  longtitude: string;
}

@ApiTags('account api')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * 유저 위치 반환
   */
  @Get('/position')
  async findUserPosition(@Query() userIdxDto: UserIdxDto): Promise<Position> {
    const position = await this.accountService.selectPosition(
      userIdxDto.userIdx,
    );
    return {
      latitude: position.latitude,
      longtitude: position.longtitude,
    };
  }

  @Post('/signup')
  async createUser(@Body() signupDto: SignUpDto) {
    console.log(signupDto.id);
    const idx = await this.accountService.createUser(signupDto.id);
    return {
      idx: idx,
      message: 'success',
    };
  }

  @Get('/duplicate')
  @ApiResponse({ status: 409, description: 'already id exist' })
  async duplicateCheck(@Query() duplicateDto: DuplicateDto) {
    await this.accountService.duplicate(duplicateDto.id);
    return {
      message: 'there is no id',
    };
  }

  /**
   *
   *  qr코드 반환
   */
  @Get('/qr')
  async findUserQr(@Query() userIdxDto: UserIdxDto) {
    const qr = await this.accountService.selectQr(userIdxDto.userIdx);
    return {
      qr: qr.qr,
    };
  }

  /**
   *
   * 유저전체 데이터
   */
  @Get('/data')
  async findUser(@Query() userIdxDto: UserIdxDto) {
    const userData = await this.accountService.selectUser(userIdxDto.userIdx);
    return userData;
  }

  /**
   *
   * coo 점수
   */
  @Get('/coo')
  async findCoo(@Query() userIdxDto: UserIdxDto) {
    const coo = await this.accountService.selectCoo(userIdxDto.userIdx);
    return {
      coo: coo.coo,
    };
  }
  @Post('/test')
  async testCreate() {
    await this.accountService.create();
    return {
      message: 'done',
    };
  }
}
