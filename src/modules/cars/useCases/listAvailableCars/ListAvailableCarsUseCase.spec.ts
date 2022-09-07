import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 01",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "XED-1234",
      fine_amount: 40,
      brand: "Car brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 01",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "XED-1234",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 03",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "XED-1235",
      fine_amount: 40,
      brand: "Car_brand_test2",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car 03",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 01",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "XED-12345",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "12345",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
