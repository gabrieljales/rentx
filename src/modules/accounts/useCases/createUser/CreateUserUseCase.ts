import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    drive_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      drive_license,
      email,
      name,
      password,
    });
  }
}

export { CreateUserUseCase };
