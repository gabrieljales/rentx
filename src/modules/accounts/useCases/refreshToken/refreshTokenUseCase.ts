import { verify, sign } from "jsonwebtoken";
import { inject } from "tsyringe";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

class RefreshTokenUseCase {
  constructor(
    @inject("UersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<string> {
    const { email, sub } = verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      subject: sub,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_DAYS,
    });

    const expires_date = this.dateProvider.addDays(
      +process.env.REFRESH_TOKEN_EXPIRES_DAYS
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
