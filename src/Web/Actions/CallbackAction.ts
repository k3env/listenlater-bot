import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AbstractAction } from ".";
import { SpotifyAuthRequest } from "../../Datasources/SpotifySessionData";

export class CallbackAction implements AbstractAction {
  execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    const state = req.query.state as string;
    const code = req.query.code as string;
    const error = req.query.error as string;
    let data: SpotifyAuthRequest = new SpotifyAuthRequest(state);
    data.code = code;
    data.error = error;
    console.log(data);
    res.send(data);
  }
}
