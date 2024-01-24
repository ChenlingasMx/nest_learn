import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { VersioningType } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// 自定义响应拦截器
import { Response } from './common/response';
// 自定义异常过滤器
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// 全局守卫
// import { UserGuard } from './user/guard/role.guard';
// 解决跨域中间件
// import * as cors from 'cors';

// const whiteList = ['/user'];

// 全局中间件
// function Middleware(req: Request, res: Response, next: NextFunction) {
//   if (whiteList.includes(req.originalUrl)) {
//     next();
//   } else {
//     res.send('我全局拦截了');
//     return;
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 注册跨域
  // app.use(cors());

  // 在路由中添加版本
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  // 注册全局静态资源目录
  app.useStaticAssets(join(__dirname, './public'));

  // 注册全局中间件
  // app.use(Middleware);

  // 注册全局session
  app.use(
    session({
      secret: 'atguigu',
      name: 'xx.sid',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  // 启用 CORS
  // 注册全局拦截器
  app.useGlobalInterceptors(new Response());
  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpFilter());
  // 注册全局DTO验证管道
  app.useGlobalPipes(new ValidationPipe());

  // 全局守卫
  // app.useGlobalGuards(new UserGuard());

  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('描述...')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
