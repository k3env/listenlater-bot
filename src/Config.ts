import { readFileSync } from "fs";

export class Config {
  mongo: MongodbConfig;
  telegram: TelegramConfig;
  spotify: SpotifyConfig;
  app: AppConfig;

  constructor() {
    // Populate with default values
    this.mongo = {
      user: "",
      password: "",
      address: "",
      proto: "mongodb",
      params: {},
      db: "ll-dev",
    };

    this.telegram = {
      token: "",
      adminList: [],
    };

    this.spotify = {
      clientId: "",
      clientSecret: "",
    };

    this.app = {
      baseUrl: "http://localhost:8081",
      port: 8081,
    };
  }

  static fromJson(url: string): Config {
    let cf: Config = JSON.parse(
      readFileSync(url).toString("utf8"),
      Config.reviver
    );
    return cf;
  }

  static load(url: string): Config {
    let cf = Config.fromJson(url);
    return cf;
  }

  private static reviver(this: any, key: string, value: any): any {
    console.log(`${key}: ${value}`);
    return value;
  }
}

export interface MongodbConfig {
  user: string;
  password: string;
  address: string;
  proto: MongoProto;
  params: {};
  db: string;
}

export interface TelegramConfig {
  token: string;
  adminList: number[];
}

export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
}

export interface AppConfig {
  baseUrl: string;
  port: number;
}

export type MongoProto = "mongodb" | "mongodb+srv";
