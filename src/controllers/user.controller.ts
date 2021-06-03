import { Context } from "koa";
import HttpStatusCode from "src/httpStatusCode";
import Message from "src/messages";
import { UserServices } from "src/services/user.services";

export class UserController {
  public static async Register(ctx: Context) {
    try {
      if (!ctx.request.body.uemail) {
        throw new Error(
          Message.InvalidRequestParam +
            " " +
            "Phone and Email are mandatory fields."
        );
      }
      const user = await UserServices.Register(
        ctx.request.body.uname || "New User",
        ctx.request.body.uemail,
        ctx.request.body.upassword || "dummypassword"
      );
      ctx.body = user;
    } catch (error) {
      console.log(error);
    }
  }

  public static async Login(ctx: Context) {
    ctx.body = "Logged In";
  }

  public static async createAccessToken(ctx: Context) {
    try {
      if (!ctx.request.body.name) {
        throw new Error(
          Message.InvalidRequestParam +
            "Cannot create an access token without name field."
        );
      }
      const api = await UserServices.createAccessToken(
        ctx.request.body.name,
        ctx.request.body.description,
        ctx.state.userId
      );
      ctx.body = { success: true, data: { token: api } };
      ctx.status = HttpStatusCode.Ok;
    } catch (error) {
      ctx.body = error.message;
      ctx.status = HttpStatusCode.RequestForbidden;
    }
  }

  public static async getAccessTokens(ctx: Context) {
    try {
      const accessToken = await UserServices.getAccessTokens(ctx.state.userId);
      const response = accessToken.map((a) => ({
        name: a.name,
        description: a.description,
        userId: a.userId,
      }));
      ctx.body = response;
      ctx.status = HttpStatusCode.Ok;
    } catch (error) {
      ctx.body = error.message;
      ctx.status = HttpStatusCode.RequestForbidden;
    }
  }

  public static async SetApiAccess(ctx: Context) {
    try {
      const email = ctx.request.body.email;
      ctx.body = await UserServices.setApiAccess(email);
    } catch (error) {
      ctx.body = error.message;
      ctx.status = HttpStatusCode.RequestForbidden;
    }
  }
}
