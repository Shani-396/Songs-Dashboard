import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSongs1758219962514 implements MigrationInterface {
    name = 'InitSongs1758219962514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "song_name" character varying NOT NULL, "band" character varying NOT NULL, "year" integer, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "songs"`);
    }

}
