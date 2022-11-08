import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
// import {  } from '@nestjs/config';
describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles the signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ name: 'Omer', email: 'e2e1@test.com', password: '1234' })
      .expect(201)
      .then((res) => {
        const { id, name, email } = res.body;
        expect(id).toBeDefined();
        expect(name).toEqual('Omer');
        expect(email).toEqual('e2e1@test.com');
      });
  });
});
