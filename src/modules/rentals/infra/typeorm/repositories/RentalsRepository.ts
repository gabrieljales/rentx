import { Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { PostgresDataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalOpenByCar = await this.repository.findOne({
      where: { car_id },
    });

    return rentalOpenByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalOpenByUser = await this.repository.findOne({
      where: { user_id },
    });

    return rentalOpenByUser;
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental: Rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { RentalsRepository };
