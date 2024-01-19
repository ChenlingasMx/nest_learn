import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [UserModule, GlobalModule.forRoot({ path: 'xiang' })],
  controllers: [AppController],
  providers: [AppService, { provide: 'Test', useValue: 'hello api' }],
})
export class AppModule {}
