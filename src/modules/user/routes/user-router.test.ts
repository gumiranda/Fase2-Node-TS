import request from 'supertest';
import { MongoHelper } from '@/bin/helpers/db/mongo/mongo-helper';
import { app } from '@/bin/configuration/app';
import { Collection } from 'mongodb';
import { addDay } from '@/bin/utils/date-fns';
import { hash } from 'bcrypt';

let userCollection: Collection;

describe('USER ROUTER', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users');
    await userCollection.deleteMany({});
  });

  describe('POST /user/register', () => {
    test('Should return 200 an user on success', async () => {
      await request(app)
        .post('/api/user/register')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: '111123',
          passwordConfirmation: '111123',
          role: 'client',
          coord: [25.0000188, -71.0087548],
          pushToken: 'any_token',
          payDay: addDay(new Date(), 7),
        })
        .expect(200);
    });
  });

  describe('POST /user/authenticate', () => {
    test('Should return 200 an token on login', async () => {
      const password = await hash('111123', 12);
      await userCollection.insertOne({
        name: 'tedsste',
        email: 'testando@gmail.com',
        password,
      });
      await request(app)
        .post('/api/user/authenticate')
        .send({
          email: 'testando@gmail.com',
          password: '111123',
        })
        .expect(200);
    });
    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/user/authenticate')
        .send({
          email: 'testando@gmail.com',
          password: '111123',
        })
        .expect(401);
    });
  });
});
