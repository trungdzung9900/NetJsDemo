import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'dungpro123a',
    database : 'taskManagement',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize : true,
} 