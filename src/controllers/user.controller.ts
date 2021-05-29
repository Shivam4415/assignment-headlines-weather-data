import { Context } from "koa";
import Message from "src/messages";
import { UserServices } from "src/services/user.services";

export class UserController {
  public static async Register(ctx: Context) {
    try {
      if (!(ctx.request.body.uphone && ctx.request.body.uemail)) {
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
}
