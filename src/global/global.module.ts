import { Global, Module } from '@nestjs/common';

@Global()
@Module({})
// 可传入参数的全局模块
export class GlobalModule {
  static forRoot(options) {
    return {
      module: GlobalModule,
      providers: [
        {
          provide: 'Global',
          useValue: { baseUrl: '/api' + '/' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Global',
          useValue: { baseUrl: '/api' + '/' + options.path },
        },
      ],
    };
  }
}
