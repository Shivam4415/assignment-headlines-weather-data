import { Context } from "koa";
import { NewsServices } from "src/services/news.service";
import NodeCache from "node-cache";
import date from "date-and-time";

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
      let data;
      const now = date.format(new Date(), "YYYY/MM/DD HH:00:00");
      // const cacheManager = new NodeCache();
      // if (cacheManager.has("")) {
      //   console.log("Retrieved value from cache !!");
      //   console.log(cacheManager.get("uniqueKey"));
      // } else {
      //   data = await NewsServices.fetch5DaysWeather(location);
      //   cacheManager.set(data.data[0].dt, data);
      // }
      //Add Data to cache and fetch from there every 3 hour diff

      data = await NewsServices.fetch5DaysWeather(location);
      // const val = date
      //   .subtract(new Date(), data.data[0].dt_txt)
      //   .toMilliseconds();

      //const val2 = date.subtract(new Date(), data.data[0].dt_txt).toSeconds();
      ctx.body = data;
    } catch (err) {
      ctx.body = "Internal Server Error";
    }
  }
}
