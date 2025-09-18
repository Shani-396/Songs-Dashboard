import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Song } from "src/song/song.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,          
    username: 'postgres',
    password: 'postgres',
    database: 'musicdb',  
    entities: [Song],
    synchronize: false, 
};
