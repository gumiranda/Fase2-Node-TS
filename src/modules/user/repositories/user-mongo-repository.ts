import { AddUserRepository } from './protocols/add-user-repository';
import { MongoHelper } from '@/bin/helpers/db/mongo/mongo-helper';
import { AddUserModel } from '@/modules/user/usecases/add-user/add-user';
import { UserModel } from '@/modules/user/models/user-model';
import { MongoRepository } from '@/bin/repository/mongo-repository';
import { LoadUserByEmailRepository } from './protocols/load-user-by-email-repository';
import variables from '@/bin/configuration/variables';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { LoadUserByTokenRepository } from './protocols/load-user-by-token-repository';
export class UserMongoRepository
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByTokenRepository {
  constructor(private readonly mongoRepository: MongoRepository) {}
  userModel: UserModel;
  role: string;
  token: string;

  async add(userData: AddUserModel): Promise<UserModel> {
    const result = await this.mongoRepository.add(userData);
    await this.mongoRepository.createIndex({ coord: '2dsphere' });
    return result && MongoHelper.mapPassword(result);
  }
  async loadByEmail(email: string): Promise<UserModel> {
    const result = await this.mongoRepository.getOne({ email });
    return result;
  }
  async loadByToken(token: string, role: string): Promise<UserModel> {
    const decoded: any = await jwt.verify(token, variables.Security.secretKey);
    const { _id } = decoded;
    let query: any = { _id: new ObjectId(_id) };
    if (role) {
      query.role = role;
    }
    const result = await this.mongoRepository.getOne(query);
    return result && MongoHelper.mapPassword(result);
  }
}
