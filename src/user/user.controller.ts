import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Inject,
  ParseFloatPipe,
  Query,
  // UseGuards,
  // SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
// 守卫
// import { UserGuard } from './guard/role.guard';
@Controller('user')
@ApiTags('用户接口')
// @UseGuards(UserGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('Global') private readonly base: string,
  ) {}

  @Get('code')
  @ApiOperation({ summary: '获取验证码', description: '请求该接口获取验证码' })
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    console.log('captcha', captcha);
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    console.log(req.session.code, body);
    if (
      req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto, userId: uuidv4() });
  }

  @Get()
  // @SetMetadata('role', ['admin'])
  // @Version('1')
  findAll(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: '用户id', required: true })
  // 管道转换数据类型
  findOne(@Param('id', ParseFloatPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
