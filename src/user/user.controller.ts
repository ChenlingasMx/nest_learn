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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('用户接口')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto });
  }

  @Get()
  @UseGuards(AuthGuard('local'))
  findAll() {
    return '查询用户列表';
  }

  @Get(':id')
  @UseGuards(AuthGuard('local'))
  findOne() {
    return '查询单个用户';
  }

  @Patch(':id')
  @UseGuards(AuthGuard('local'))
  update(@Param('id') id, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('local'))
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
