import { mockFakeUser } from '../../models/mocks/mock-user';
import { UserModel } from '../../models/user-model';
import { AddUser, AddUserModel } from '../add-user/add-user';
import { LoadUserByToken } from '../load-user-by-token/load-user-by-token';

export const mockAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    userModel = mockFakeUser('client');
    async add(user: AddUserModel): Promise<UserModel> {
      //this.userModel = { _id: this.userModel._id, ...user };
      return new Promise((resolve) => resolve(this.userModel));
    }
  }
  return new AddUserStub();
};
export const mockLoadUserByToken = (): LoadUserByToken => {
  class LoadUserByTokenStub implements LoadUserByToken {
    userModel = mockFakeUser('client');
    accessToken: string;
    role: string;
    async load(accessToken: string, role?: string): Promise<UserModel> {
      this.accessToken = accessToken;
      this.role = role;
      return new Promise((resolve) => resolve(this.userModel));
    }
  }
  return new LoadUserByTokenStub();
};
