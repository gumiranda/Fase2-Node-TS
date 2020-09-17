import { Controller } from '@/bin/protocols/controller';
import { AddUser } from '@/modules/user/usecases/add-user/add-user';
import { HttpResponse, HttpRequest } from '@/bin/protocols/http';
import {
  badRequest,
  serverError,
  ok,
  forbidden,
} from '@/bin/helpers/http-helper';
import { Validation } from '@/bin/helpers/validators/validation';
import { EmailInUseError } from '@/bin/errors';
import { addDay } from '@/bin/utils/date-fns';
import OneSignal from '@/bin/helpers/onesignal';

export class SignUpController implements Controller {
  private readonly addUser: AddUser;
  private readonly validation: Validation;

  constructor(addUser: AddUser, validation: Validation) {
    this.validation = validation;
    this.addUser = addUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = this.validation.validate(httpRequest.body);
      if (errors?.length > 0) {
        return badRequest(errors);
      }
      if (!httpRequest.body.role || httpRequest.body?.role === 'admin') {
        httpRequest.body.role = 'client';
      }
      const {
        name,
        email,
        password,
        role,
        pushToken,
        pushId,
        coord,
      } = httpRequest.body;
      let position = coord;
      const payDay = addDay(new Date(), 7);
      let obj: any = {
        name,
        email,
        password,
        role,
        coord: { type: 'Point', coordinates: position },
        payDay,
        face: false,
        active: true,
        plan: 'basic',
        createdAt: new Date(),
      };
      if (pushId) {
        obj.pushId = pushId;
      }
      const user = await this.addUser.add(obj);
      if (!user) {
        return forbidden(new EmailInUseError());
      }
      if (pushToken) {
        await OneSignal.addDevice(pushToken);
      }
      return ok(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
