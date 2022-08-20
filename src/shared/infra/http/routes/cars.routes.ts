import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes: Router = Router();

const createCarController: CreateCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
