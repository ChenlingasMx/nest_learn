import {
  Injectable,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersrDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private users: Model<UsersrDocument>,
    private jwtService: JwtService,
  ) {}

  // 注册
  async signup(params) {
    const { username, password } = params;
    const hashedPassword = await bcrypt.hash(password, 10);
    const findUser = await this.users.findOne({ username: username });
    if (findUser) {
      return '用户已存在';
    }
    await this.users.create({
      username,
      password: hashedPassword,
      uuid: uuidv4(),
    });
    return '注册成功';
  }

  // 登陆
  async login(params) {
    const { username, password } = params;
    const findUser = await this.users.findOne({ username: username });
    if (!findUser) return '用户不存在';
    // 找到了对比密码
    const compareRes: boolean = await bcrypt.compare(
      password,
      findUser.password,
    );
    // 密码不正确
    if (!compareRes) return '密码不正确';
    const payload = { username: username, sub: findUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
