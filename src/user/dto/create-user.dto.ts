import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  username: string;

  @IsNumber()
  password: number;
}
