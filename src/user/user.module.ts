import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from '../middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
  // 导出UserService
  exports: [UserService],
})

// 注册中间件
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 拦截的路由
    consumer.apply(Logger).forRoutes('user');
    // 具体请求方法做拦截
    // consumer
    //   .apply(Logger)
    //   .forRoutes({ path: 'user', method: RequestMethod.POST });

    // 拦截所有请求
    // consumer.apply(Logger).forRoutes(UserController);
  }
}
