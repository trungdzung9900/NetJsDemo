import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common';
import * as config from 'config';
async function bootstrap() {
  const logger = new Logger('boostrap');
  const severConfig =  config.get('server')
  const app = await NestFactory.create(AppModule);

  //  turn on CORS to front end access
  if (process.env.NODE_ENV === 'development' ){
    app.enableCors();
  }
  const port = process.env.PORT || severConfig.port
  await app.listen(port);
  console.log(`Sever running in port ${port}`);
  
}
bootstrap();
 