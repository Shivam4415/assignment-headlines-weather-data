import { config } from "src/config";
import { isDefinedAndNotNullAndNotEmpty } from "src/utils";
import Message from "src/messages";
const NewsAPI = require("newsapi");
const axios = require("axios");

export class NewsServices {
  public static async fetchNews(country: string, query: string) {
    try {
      const newsapi = new NewsAPI(config.newsApiKey);
      let data: any[] = [];

      if (isDefinedAndNotNullAndNotEmpty(query)) {
        data = await newsapi.v2
          .everything({
            q: query,
          })
          .then((response: any) => {
            return response.articles;
          });
      } else {
        data = await newsapi.v2
          .topHeadlines({
            country: country,
          })
          .then((response: any) => {
            return response.articles;
          });
      }
      if (!data) {
        throw Error(Message.NotFound);
      }
      return {
        count: data.length,
        data,
      };
    } catch (err) {
      throw err;
    }
  }

  public static async fetch5DaysWeather(location: string) {
    try {
      const url = `${config.weatherEndPoint}?q=${location}&appid=${config.weatherApiKey}`;
      const data = await axios
        .get(url)
        .then((response: any) => {
          return response.data;
        })
        .catch((err: any) => {
          console.log(err);
          throw err;
        });
      if (!data) {
        throw Error(Message.NotFound);
      }
      return {
        location,
        timeStamp: data.list[0].dt_txt,
        count: data.cnt,
        data: data.list,
      };
    } catch (err) {
      throw err;
    }
  }
}
