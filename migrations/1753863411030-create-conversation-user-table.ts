import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConversationUserTable1753863411030 implements MigrationInterface {
    name = 'CreateConversationUserTable1753863411030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversation_user" ("id" SERIAL NOT NULL, "conversationId" integer NOT NULL, "userId" integer, "guestId" integer, CONSTRAINT "PK_0825886afb03b1a6f11345b4e8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD CONSTRAINT "FK_f71233a63761553475a2acd8690" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP CONSTRAINT "FK_f71233a63761553475a2acd8690"`);
        await queryRunner.query(`DROP TABLE "conversation_user"`);
    }

}
