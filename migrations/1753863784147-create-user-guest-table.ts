import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserGuestTable1753863784147 implements MigrationInterface {
    name = 'CreateUserGuestTable1753863784147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_guest" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "deviceId" character varying(255), CONSTRAINT "PK_91451df0e90773d659af1f8bd3f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_guest"`);
    }

}
