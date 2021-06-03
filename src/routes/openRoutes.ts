import Router from "koa-router";
import { NewsController } from "src/controllers/news.controller";
import { UserController } from "src/controllers/user.controller";
import { AuthenticationController } from "../controllers/authentication.controller";

const router = new Router();

router.get("/weather", NewsController.get5DayWeatherReport);

router.post("/signup", UserController.Register);

export const openRoutes = router.routes();
