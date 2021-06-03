import { Context } from "koa";
import basicAuth from "basic-auth";
import Message from "src/messages";
import HttpStatusCode from "src/httpStatusCode";
import { UserServices } from "src/services/user.services";
import { redisStorage } from "../storage/redis";
const redis = require("redis");
const client = redis.createClient();

export class AuthenticationController {
  public static async AuthenticateApi(ctx: Context, next: any) {
    try {
      const auth = basicAuth(ctx.req);
      if (!auth || !auth.pass || !auth.name) {
        ctx.body = Message.Unauthorized;
        ctx.status = HttpStatusCode.Unauthorized;
        return;
      }
      const user = await UserServices.getByEmail(auth.name, true);
      if (!user || !user.accessTokens || !user.accessTokens.length) {
        ctx.body = Message.Unauthorized;
        ctx.status = HttpStatusCode.Unauthorized;
        return;
      }

      const accessToken = user.accessTokens.find((u) => {
        return u.accessToken === auth.pass;
      });
      if (!accessToken) {
        ctx.body = Message.Unauthorized;
        ctx.status = HttpStatusCode.Unauthorized;
        return;
      }

      ctx.state.email = user.email;
      ctx.state.userId = user.id;
      return next();
    } catch (err) {
      ctx.body = err.message;
      ctx.status = HttpStatusCode.Unauthorized;
    }
  }

  public static async AuthenticateInternalCall(ctx: Context, next: any) {
    const userReq = basicAuth(ctx.req);
    if (!userReq || !userReq.name) {
      ctx.body = Message.Unauthorized;
      ctx.status = HttpStatusCode.Unauthorized;
      return;
    }
    if (userReq.name === "Shiv" && userReq.pass === "12345") {
      return next();
    }
    return;
  }

  public static async AuthenticateForAccessToken(ctx: Context, next: any) {
    try {
      const userReq = basicAuth(ctx.req);
      if (!userReq || !userReq.name) {
        ctx.body = Message.Unauthorized;
        ctx.status = HttpStatusCode.Unauthorized;
        return;
      }
      const user = await UserServices.isUserExists(userReq.name);
      if (!user || !user.hasApiAccess) {
        ctx.body = Message.Unauthorized;
        ctx.status = HttpStatusCode.Unauthorized;
        return;
      }
      if (userReq.pass !== user.password) {
        ctx.body = Message.Unauthorized;
        ctx.status = HttpStatusCode.Unauthorized;
        return;
      }
      ctx.state.userId = user.id;
      return next();
    } catch (err) {
      ctx.body = err.message;
      ctx.status = HttpStatusCode.Unauthorized;
    }
  }

  public static async getDataFromRedis(ctx: Context, next: any) {
    try {
      await client.get("postData", (err: any, redisData: any) => {
        if (err) {
          throw err;
        } else if (redisData) {
          ctx.body = JSON.parse(redisData);
          return;
        } else {
          next();
        }
      });
    } catch (err) {
      ctx.body = err.message;
      ctx.status = HttpStatusCode.InternalServerError;
    }
  }

  public static async getDataFromCache(ctx: Context, next: any) {
    try {
      const location = ctx.request.query.location?.toString() || "kolkata";
      const data = await redisStorage.get("data");
      const res = data.find((d: string) => {
        return JSON.parse(d).location === location;
      });
      if (!res) {
        return next();
      } else {
        ctx.body = (res && JSON.parse(res)) || [];
      }
    } catch (err) {
      ctx.body = err.message;
      ctx.status = HttpStatusCode.InternalServerError;
    }
  }
}
