import { mockFakeUser } from '../../models/mocks/mock-user';
import { UserModel } from '../../models/user-model';
import { AddUser, AddUserModel } from '../add-user/add-user';

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
