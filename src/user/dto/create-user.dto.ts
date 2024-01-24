import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '账号', example: '小满', required: true })
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  name: string;

  @ApiProperty({ description: '描述', example: '1234' })
  desc: string;
}
