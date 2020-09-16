import { UserMongoRepository } from './user-mongo-repository';
import { MongoHelper } from '@/bin/helpers/db/mongo/mongo-helper';
import { Collection } from 'mongodb';
import { mockFakeUserData } from '@/modules/user/models/mocks/mock-user';
import { MongoRepository } from '@/bin/repository/mongo-repository';
import MockDate from 'mockdate';
let userCollection: Collection;

describe('User Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    MockDate.set(new Date());
  });

  afterAll(async () => {
    MockDate.reset();
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users');
    await userCollection.deleteMany({});
  });

  const makeSut = (): UserMongoRepository => {
    const mongoRepository = new MongoRepository('users');
    return new UserMongoRepository(mongoRepository);
  };
  test('Should return an user add success', async () => {
    const sut = makeSut();
    const user = await sut.add(mockFakeUserData('client'));
    expect(user).toBeTruthy();
    expect(user._id).toBeTruthy();
    expect(user.name).toBe('valid_name');
    expect(user.email).toBe('valid_email@mail.com');
  });

  test('Should return an user loadByEmail success', async () => {
    const sut = makeSut();
    await userCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    const user = await sut.loadByEmail('any_email@mail.com');
    expect(user).toBeTruthy();
    expect(user._id).toBeTruthy();
    expect(user.name).toBe('any_name');
    expect(user.email).toBe('any_email@mail.com');
  });
  test('Should return null user if loadByEmail fails', async () => {
    const sut = makeSut();
    const user = await sut.loadByEmail('any_email@mail.com');
    expect(user).toBeFalsy();
  });
  test('Should return null user if loadByEmail fails', async () => {
    const sut = makeSut();
    const user = await sut.loadByEmail('any_email@mail.com');
    expect(user).toBeFalsy();
  });
});
