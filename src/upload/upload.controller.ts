import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return true;
  }

  // 下载图片
  @Get('export')
  downLoad(@Res() res) {
    const url = join(__dirname, '../public/1705744100215.jpeg');
    // res
    // console.log(url)
    res.download(url);
    // return  true
  }

  // 下载文件流
  @Get('stream')
  async down(@Res() res) {
    const url = join(__dirname, '../public/1705744100215.jpeg');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);

    res.setHeader('Content-Type', 'application/octet-stream');

    res.setHeader('Content-Disposition', `attachment; filename=xiaoman`);

    tarStream.pipe(res);
  }
}
