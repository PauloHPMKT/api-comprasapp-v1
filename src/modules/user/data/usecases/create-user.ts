import {
  CreateUserModel,
  CreateUserPort,
} from '../../domain/ports/create-user-port';

export class CreateUserUseCase implements CreateUserPort {
  async execute(
    params: CreateUserModel.Params,
  ): Promise<CreateUserModel.Result> {
    console.log(params);
    // chama o caso de uso do usuario para criar o usuário
    // const isUserExists = await this.isExistsUserRepositoryPort.exists(
    //   params.email,
    // );
    // if (isUserExists) throw new UserAlreadyExistsError();
    return {
      email: 'valid_email@mail.com',
      id: 'valid_id',
    };
  }
}
