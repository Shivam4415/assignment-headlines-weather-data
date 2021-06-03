import * as Interfaces from "./types/interfaces";

export const config: Interfaces.IConfig = {
  port: parseInt(process.env.NODE_PORT || process.env.PORT || "1337", 10),
  isLocal: process.env.NODE_ENV === "local",
  newsApiEndPoint: "https://newsapi.org/v2/",
  newsApiKey: process.env.NEWS_API || "ab7b14ae3c554ecfb1e114fc02dadd7e",
  weatherEndPoint: "https://api.openweathermap.org/data/2.5/forecast",
  weatherApiKey: "0343b80f1d5a487f4c5923307db1341e",
};
