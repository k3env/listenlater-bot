import { MongoProto } from "../Config";

export class MongoDS {
  private _user: string;
  private _pass: string;
  private _proto: MongoProto;
  private _endpoint: string;
  private _db: string;
  private _params: {};

  constructor(
    user: string,
    pass: string,
    proto: MongoProto,
    endpoint: string,
    db: string,
    params: {}
  ) {
    this._user = encodeURIComponent(user);
    this._pass = encodeURIComponent(pass);
    this._proto = proto;
    this._endpoint = endpoint;
    this._db = db;
    this._params = params;
  }

  public get db(): string {
    return this._db;
  }

  public get uri(): string {
    return `${this._proto}://${this._user}:${this._pass}@${this._endpoint}/${this._db}?${this.queryString}`;
  }

  public get queryString(): string {
    return new URLSearchParams(this._params).toString();
  }
}
