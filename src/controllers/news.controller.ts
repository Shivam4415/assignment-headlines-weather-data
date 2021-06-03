import { Context } from "koa";
import { NewsServices } from "src/services/news.service";
import { redisStorage } from "../storage/redis";
const redis = require("redis");
const client = redis.createClient();

export class NewsController {
  public static async getNews(ctx: Context) {
    try {
      const search = JSON.stringify(ctx.request.query.search) || "";
      const country = JSON.stringify(ctx.request.query.country) || "in";
      const data = await NewsServices.fetchNews(country, search);
      ctx.body = data;
    } catch (err) {
      ctx.body = "Internal Server Error";
    }
  }

  public static async get5DayWeatherReport(ctx: Context) {
    try {
      const location = ctx.request.query.location?.toString() || "kolkata";
      const data = await NewsServices.fetch5DaysWeather(location);
      await redisStorage.add("data", JSON.stringify(data));
      ctx.body = data;
    } catch (err) {
      ctx.body = "Internal Server Error";
    }
  }
}
