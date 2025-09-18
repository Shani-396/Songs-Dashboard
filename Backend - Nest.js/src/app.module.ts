import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SongService } from './song/song.service';
import { SongController } from './song/song.controller';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SongModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
