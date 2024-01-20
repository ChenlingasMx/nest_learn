import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/global.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, GlobalModule.forRoot({ path: 'xiang' }), UploadModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'Test', useValue: 'hello api' }],
})
export class AppModule {}
