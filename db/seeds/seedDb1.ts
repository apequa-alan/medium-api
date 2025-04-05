import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedDb1736235862506 implements MigrationInterface {
  name = 'seedDb1736235862506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    await queryRunner.query(
      // pass 123
      `INSERT INTO users (username, email, password) VALUES ('user', 'user@gmail.com', '$2b$10$HhqfsiDUASQedAW4/vIGpeWXpODb3pZibh2kS43Fn7i1d4OAKIGK2')`,
    );
    await queryRunner.query(
      // pass 123
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'dragons, coffee', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
