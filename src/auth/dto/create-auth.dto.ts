import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAuthDto {
  @ApiProperty({ description: '账号', required: true })
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  username: string;

  @ApiProperty({ description: '密码', required: true })
  @IsNotEmpty() //验证是否为空
  password: string;

}
