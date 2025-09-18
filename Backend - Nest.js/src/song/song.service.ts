import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import csvParser from 'csv-parser';
import { Song } from 'src/song/song.entity';
import { Readable } from 'stream';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song)
        private readonly songRepository: Repository<Song>,
    ) { }

    async findAll(): Promise<Song[]> {
        try {
            return await this.songRepository.find({
                order: { band: 'ASC' }
            });
        }
        catch (error) {
            throw new BadRequestException('Failed to fetch songs');
        }
    }

    async importCsvFile(csvFile: Express.Multer.File): Promise<{ inserted: number }> {
        if (!csvFile) {
            throw new BadRequestException('No file uploaded');
        }

        const songs: Partial<Song>[] = [];

        const stream = Readable.from(csvFile.buffer);

        return new Promise((resolve, reject) => {
            stream
                .pipe(csvParser({ separator: ';' }))
                .on('data', (row) => songs.push(this.parseCsvRow(row)))
                .on('end', async () => {
                    try {
                        const result = await this.saveSongs(songs);
                        resolve(result)
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', () => reject(new BadRequestException('Invalid CSV format')));

        });
    }

    // Private Methods

    // parse one row to song entity
    private parseCsvRow(row: Record<string, string>): Partial<Song> {
        return {
            songName: String(row['Song Name'] || '').toLowerCase(),
            band: String(row['Band'] || '').toLowerCase(),
            year: row['Year'] ? parseInt(row['Year'], 10) : null
        };
    }


    // save array of songs in the DB
    private async saveSongs(songs: Partial<Song>[]): Promise<{ inserted: number }> {
        try {
            await this.songRepository.save(songs);
            return { inserted: songs.length };
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to save songs');
        }
    }




}
