import { Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersrDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private users: Model<UsersrDocument>) {}

  async findAll(
    @Query() query: { keyWord: string; page: number; pageSize: number },
  ) {
    const { keyWord, page, pageSize } = query;

    // 构建查询条件
    const filter = keyWord
      ? { name: { $regex: new RegExp(keyWord.replace(/\s+/g, '\\s*'), 'i') } }
      : {};
    // 计算跳过的文档数量，以及限制返回的文档数量
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const data = await this.users.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'tags', // The name of the tags collection
          localField: 'userId',
          foreignField: 'userId',
          as: 'tags',
        },
      },
      {
        $project: {
          name: 1,
          desc: 1,
          userId: 1,
          tags: '$tags', // Adjust based on your actual schema
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: Number(limit),
      },
    ]);
    return data;
  }

  async findOne(uuid) {
    return await this.users.findOne({ uuid });
  }

  async update(uuid, updateUserDto: CreateUserDto) {
    await this.users.findOneAndUpdate({ uuid: uuid }, updateUserDto);
    return null;
  }

  async remove(uuid) {
    await this.users.findOneAndDelete({ uuid: uuid });
    return null;
  }
}
