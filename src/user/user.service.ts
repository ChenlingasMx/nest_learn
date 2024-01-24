import { Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersrDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private users: Model<UsersrDocument>) {}

  async create(createUserDto: CreateUserDto) {
    await this.users.create(createUserDto);
    return null;
  }

  async findAll(
    @Query() query: { keyWord: string; page: number; pageSize: number },
  ) {
    const { keyWord, page, pageSize } = query;

    // 构建查询条件
    const filter = keyWord ? { name: { $regex: new RegExp(keyWord, 'i') } } : {};

    // 计算跳过的文档数量，以及限制返回的文档数量
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const data = await this.users.find(filter).skip(skip).limit(limit);
    return data;
  }

  async findOne(id) {
    const objectId = new mongoose.Types.ObjectId(id);
    return await this.users.findById(objectId);
  }

  async update(id, updateUserDto: CreateUserDto) {
    const objectId = new mongoose.Types.ObjectId(id);
    await this.users.findByIdAndUpdate(objectId, updateUserDto);
    return null;
  }

  async remove(id) {
    const objectId = new mongoose.Types.ObjectId(id);
    await this.users.findByIdAndDelete(objectId);
    return null;
  }

  // 爬虫
  async reptile() {
    const urls: string[] = [];
    const getPhotos = async () => {
      const response = await axios.get(
        'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E7%BE%8E%E5%A5%B3&step_word=&hs=0&pn=24&spn=0&di=7264239678495129601&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2997902326%2C4234564017&os=3475269008%2C2831614356&simid=2997902326%2C4234564017&adpicid=0&lpn=0&ln=859&fr=&fmq=1706002313291_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=girl&bdtype=0&oriquery=&objurl=https%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F26%2F50%2Fe6%2F2650e65c12d61da59d8a172dab23669d.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bjgpj61jfh_z%26e3Bv54AzdH3F15ogs5w1AzdH3Fmdb09-n9abm0AzdH3F&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwyLDEsMyw0LDYsNSw3LDgsOQ%3D%3D&lid=8178508941665768450',
      );
      const body = response.data;
      const $ = cheerio.load(body);
      $('.img-wrapper img').each((index, element) => {
        const imgSrc = $(element).attr('src');
        if (imgSrc) {
          urls.push(imgSrc);
        }
      });
    };
    await getPhotos();
    this.writeFile(urls);
    return `cos`;
  }
  async writeFile(urls: string[]) {
    for (const url of urls) {
      try {
        const buffer = await axios
          .get(url, { responseType: 'arraybuffer' })
          .then((res) => res.data);
        const ws = fs.createWriteStream(
          path.join(__dirname, '../public/' + new Date().getTime() + '.jpg'),
        );
        ws.write(buffer);
      } catch (error) {
        console.error('Error fetching or writing file:', error);
      }
    }
  }
}
