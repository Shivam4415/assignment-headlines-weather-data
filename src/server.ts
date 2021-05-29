import { config } from "./config";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import { apiRoutes } from "./routes/apiRoutes";

createConnection()
  .then(async (connection) => {
    const app = new Koa();
    // app.use(bodyParser({ jsonLimit: "10mb" }));

    app.use(apiRoutes);
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(async (error) => {
    console.log("TypeORM connection error: ", error);
  });
