import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable, singleton } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const jwt_expires_in = process.env.JWT_EXPIRES_IN;

    if (!user) {
      // Invés de dizer "usuário não existe", é melhor dessa maneira (por segurança, evita fornecer informação sensível)
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({ email }, `${process.env.JWT_SECRET}`, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refresh_token = sign({}, `${process.env.REFRESH_TOKEN_SECRET}`, {
      subject: user.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      +process.env.REFRESH_TOKEN_EXPIRES_DAYS
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
