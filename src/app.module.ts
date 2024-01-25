import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 连接数据库
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-learn'),
    UserModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'Test', useValue: 'hello api' }],
})
export class AppModule {}
