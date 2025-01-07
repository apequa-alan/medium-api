import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveNameFromArticle1736287197276 implements MigrationInterface {
    name = 'RemoveNameFromArticle1736287197276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "name" character varying NOT NULL`);
    }

}
