import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConversationTable1753861382228 implements MigrationInterface {
    name = 'CreateConversationTable1753861382228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."conversation_type_enum" AS ENUM('PERSONAL', 'GROUP')`);
        await queryRunner.query(`CREATE TABLE "conversation" ("id" SERIAL NOT NULL, "name" character varying(255), "type" "public"."conversation_type_enum" NOT NULL DEFAULT 'PERSONAL', CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "conversation"`);
        await queryRunner.query(`DROP TYPE "public"."conversation_type_enum"`);
    }

}
