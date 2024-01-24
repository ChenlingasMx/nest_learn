import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 定义类型，与Document组合方便后面使用
export type UsersrDocument = Users & Document;

//定义模式 主要是mongoDB 集合的各种信息
@Schema()
export class Users extends Document {
  @Prop({ type: 'string' })
  name: string;

  @Prop({ type: 'string' })
  desc: string;

  @Prop({ type: 'string' })
  userId: string;
}

//使用createForClass 生产Schema对象
export const UsersSchema = SchemaFactory.createForClass(Users);
