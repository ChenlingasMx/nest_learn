import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/public.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('用户权限接口')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() params: CreateAuthDto) {
    return this.authService.signup(params);
  }

  @Public()
  @Post('login')
  async login(@Body() params: CreateAuthDto) {
    return this.authService.login(params);
  }
}
