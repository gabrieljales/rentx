import * as dotenv from "dotenv";
import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
