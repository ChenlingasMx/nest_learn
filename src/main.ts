import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { VersioningType } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
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
  // app.use(cors());
  // 在路由中添加版本
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });
  app.useStaticAssets(join(__dirname, './public'));
  // app.use(Middleware);
  app.use(
    session({
      secret: 'atguigu',
      name: 'xx.sid',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  await app.listen(3000);
}
bootstrap();
