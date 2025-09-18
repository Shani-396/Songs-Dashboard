import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'songs' })
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'song_name', nullable: false })
    songName: string;

    @Column({ nullable: false })
    band: string;

    @Column({ type: 'int', nullable: true })
    year: number | null;
}