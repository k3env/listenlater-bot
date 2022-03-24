import { Db } from "mongodb";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class LoginAction {
  execute(
    params: { db: Db; clientId: string; callback: string },
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    const state = req.query.state as string;
    const scope = "user-read-private user-read-email";
    if (state === undefined) {
      res.send({ status: "error", message: "state isn't set" });
    } else {
      const query = new URLSearchParams({
        response_type: "code",
        client_id: params.clientId,
        scope: scope,
        redirect_uri: params.callback,
        state: state,
      }).toString();

      res.send(`https://accounts.spotify.com/authorize?${query}`);
    }
  }
}
