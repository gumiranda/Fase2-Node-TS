import {
  mockFakeUser,
  mockFakeUserUpdated,
} from '@/modules/user/models/mocks/mock-user';
import { AddUserRepository } from '@/modules/user/repositories/protocols/add-user-repository';
import { AddUserModel } from '@/modules/user/usecases/add-user/add-user';
import { UserData, UserModel } from '@/modules/user/models/user-model';
import { LoadUserByEmailRepository } from '@/modules/user/repositories/protocols/load-user-by-email-repository';
import { LoadUserByTokenRepository } from '../protocols/load-user-by-token-repository';
import { UpdateUserRepository } from '../protocols/update-user-repository';
import { UpdatePasswordRepository } from '../protocols/update-password-repository';
import { LoadUserByIdRepository } from '../protocols/load-user-by-id-repository';

export const mockAddUserRepository = (): AddUserRepository => {
  //  userModel = mockFakeUser('client');
  class AddUserRepositoryStub implements AddUserRepository {
    userModel = mockFakeUser('client');
    async add(userData: AddUserModel): Promise<UserModel> {
      return new Promise((resolve) => resolve(this.userModel));
    }
  }
  return new AddUserRepositoryStub();
};
export const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail(email: string): Promise<UserModel> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new LoadUserByEmailRepositoryStub();
};
export const mockLoadUserByEmailRepositoryNotNull = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    userModel = mockFakeUser('client');
    async loadByEmail(email: string): Promise<UserModel> {
      this.userModel.password = 'any_password';
      this.userModel._id = 'any_id';
      this.userModel.email = email;
      return new Promise((resolve) => resolve(this.userModel));
    }
  }
  return new LoadUserByEmailRepositoryStub();
};
export const mockLoadUserByTokenRepository = (): LoadUserByTokenRepository => {
  class LoadUserByTokenRepositoryStub implements LoadUserByTokenRepository {
    role: string;
    token: string;
    userModel = mockFakeUser('client');
    async loadByToken(token: string, role?: string): Promise<UserModel> {
      this.token = token;
      this.role = role;
      return new Promise((resolve) => resolve(this.userModel));
    }
  }
  return new LoadUserByTokenRepositoryStub();
};
export const mockUpdateUserRepository = (): UpdateUserRepository => {
  class UpdateUserRepositoryStub implements UpdateUserRepository {
    async updateOne(
      userData: UserData,
      userId: string,
    ): Promise<Omit<UserModel, 'password'>> {
      return new Promise((resolve) => resolve(this.userModel));
    }
    userModel = mockFakeUserUpdated('client');
  }
  return new UpdateUserRepositoryStub();
};
export const mockUpdatePasswordRepository = (): UpdatePasswordRepository => {
  //  userModel = mockFakeUser('client');
  class UpdatePasswordRepositoryStub implements UpdatePasswordRepository {
    async updatePassword(
      newPassword: string,
      userId: string,
    ): Promise<Omit<UserModel, 'password'>> {
      return new Promise((resolve) => resolve(this.userModel));
    }
    userModel = mockFakeUserUpdated('client');
  }
  return new UpdatePasswordRepositoryStub();
};
export const mockLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdStub implements LoadUserByIdRepository {
    userModel = mockFakeUser('client');
    _id: string;
    async loadById(_id: string): Promise<UserModel> {
      this._id = _id;
      if (this.userModel !== null) {
        this.userModel._id = _id;
      }
      return new Promise((resolve) => resolve(this.userModel));
    }
  }
  return new LoadUserByIdStub();
};
