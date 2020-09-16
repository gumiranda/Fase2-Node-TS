import { LogMongoRepository } from "@/bin/infra/log-repository/log-mongo-repository"
import { Controller } from "@/bin/protocols/controller";
import { LogControllerDecorator } from "../../decorators/log-controller-decorator";

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller,logMongoRepository)
}