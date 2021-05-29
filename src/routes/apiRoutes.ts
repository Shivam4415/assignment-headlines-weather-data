import Router from "koa-router";
import { UserController } from "src/controllers/user.controller";
import { AuthenticationController } from "../controllers/authentication.controller";

const router = new Router();
// router.use(AuthenticationController.AuthenticateApi);

router.post("/signup", UserController.Register);

router.post("/login", UserController.Login);

// Important Lines to export
export const apiRoutes = router.routes();
