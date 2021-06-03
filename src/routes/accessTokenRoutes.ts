import Router from "koa-router";
import { UserController } from "src/controllers/user.controller";
import { AuthenticationController } from "../controllers/authentication.controller";

const router = new Router();

router.use(AuthenticationController.AuthenticateForAccessToken);

router.post("/accessTokens", UserController.createAccessToken);

router.get("/accessTokens", UserController.getAccessTokens);

// router.delete("/accessTokens", UserController.deleteAccessToken);

export const accessTokenRoutes = router.routes();
