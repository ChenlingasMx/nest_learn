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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户接口')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return '查询用户列表';
  }

  @Get(':id')
  findOne() {
    return '查询单个用户';
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
