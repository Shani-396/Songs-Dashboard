import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SongService } from './song.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('songs')
export class SongController {
    constructor(private readonly songService: SongService) { }

    @Get() // API Request - Get All Songs
    async getAllSongs() {
        try {
            const songs = await this.songService.findAll();
            return {
                success: true,
                data: songs,
                count: songs.length
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch songs',
                statusCode: error.getStatus?.() || 500
            };
        }        
    }

    @Post('upload') // API Request - Upload CSV File
    @UseInterceptors(FileInterceptor('file'))
    async uploadCsvFile(@UploadedFile() csvFile: Express.Multer.File) {
        try {
            const result = await this.songService.importCsvFile(csvFile);
            return {
                success: true,
                data: result,
                count: result.inserted
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to import CSV file',
                statusCode: error.getStatus?.() || 500
            };
        }
    }
}
