import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common'
async function bootstrap() {
  const logger = new Logger('boostrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Sever running in port 3000');
  
}
bootstrap();
