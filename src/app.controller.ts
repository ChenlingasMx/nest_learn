import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // 注册userService
    private readonly userService: UserService,
    @Inject('Test') private test: string,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
