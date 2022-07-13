import * as dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
