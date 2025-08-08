import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableTest1754559755684 implements MigrationInterface {
    name = 'UpdateTableTest1754559755684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_guest" ADD "deviceId1" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_guest" DROP COLUMN "deviceId1"`);
    }

}
