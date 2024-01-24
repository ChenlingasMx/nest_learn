import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/global.module';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // 连接数据库
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-learn'),
    UserModule,
    GlobalModule.forRoot({ path: 'xiang' }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'Test', useValue: 'hello api' }],
})
export class AppModule {}
