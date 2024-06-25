import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateOperations1718818346423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO operation (type, cost) VALUES
            ('addition', 10),
            ('subtraction', 10),
            ('multiplication', 15),
            ('division', 15),
            ('square_root', 25),
            ('random_string', 40);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM operation;
        `);
    }

}
