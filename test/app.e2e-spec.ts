import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from 'src/v1/users/users.module';

describe('Users controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/users POST', () => {
    return request(app.getHttpServer())
      .post('/v1/users')
      .expect(200)
      .expect('Hello World!');
  });
});
