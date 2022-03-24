import { Db } from "mongodb";
import express from "express";
import { CallbackAction, HomeAction, LoginAction } from "./Actions";
import core from "express-serve-static-core";

export class Web {
  private static app: core.Express;
  static start(port: number, db: Db, clientId: string, clientSecret: string) {
    const loginAction = new LoginAction();
    // db,
    // clientId,
    // `http://localhost:${port}/callback`

    Web.app = express();
    Web.app.get("/callback", new CallbackAction().execute);
    Web.app.get("/login", (req, res) =>
      loginAction.execute(
        {
          db: db,
          clientId: clientId,
          callback: `http://localhost:${port}/callback`,
        },
        req,
        res
      )
    );
    Web.app.get("/", new HomeAction().execute);
    Web.app.listen(port, () => console.log(`Server started on ${port}`));
  }

  static stop() {}
}
