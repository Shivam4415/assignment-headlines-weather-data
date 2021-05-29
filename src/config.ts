export interface IConfig {
  port: number;
  isLocal: boolean;
}

export const config: IConfig = {
  port: parseInt(process.env.NODE_PORT || process.env.PORT || "1337", 10),
  isLocal: process.env.NODE_ENV === "local",
};
