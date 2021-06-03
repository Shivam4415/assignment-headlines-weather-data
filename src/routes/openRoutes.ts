import Router from "koa-router";
import { NewsController } from "src/controllers/news.controller";
import { UserController } from "src/controllers/user.controller";
import { AuthenticationController } from "../controllers/authentication.controller";

const router = new Router();
router.post("/signup", UserController.Register);

router.get(
  "/weather",
  AuthenticationController.getDataFromCache,
  NewsController.get5DayWeatherReport
);

export const openRoutes = router.routes();
