import { AddUserRepository } from './protocols/add-user-repository';
import { MongoHelper } from '@/bin/helpers/db/mongo/mongo-helper';
import { AddUserModel } from '@/modules/user/usecases/add-user/add-user';
import { UserModel } from '@/modules/user/models/user-model';
import { MongoRepository } from '@/bin/repository/mongo-repository';
import { LoadUserByEmailRepository } from './protocols/load-user-by-email-repository';
export class UserMongoRepository
  implements AddUserRepository, LoadUserByEmailRepository {
  constructor(private readonly mongoRepository: MongoRepository) {}

  async add(userData: AddUserModel): Promise<UserModel> {
    const result = await this.mongoRepository.add(userData);
    await this.mongoRepository.createIndex({ coord: '2dsphere' });
    return result && MongoHelper.mapPassword(result);
  }
  async loadByEmail(email: string): Promise<UserModel> {
    const result = await this.mongoRepository.getOne({ email });
    return result;
  }
}
