import Router from "koa-router";
import { NewsController } from "src/controllers/news.controller";
import { UserController } from "src/controllers/user.controller";
import { AuthenticationController } from "../controllers/authentication.controller";

const router = new Router();

router.post(
  "/apiAccess",
  AuthenticationController.AuthenticateInternalCall,
  UserController.SetApiAccess
);

router.use(AuthenticationController.AuthenticateApi);

router.get("/news", NewsController.getNews);

export const apiRoutes = router.routes();
