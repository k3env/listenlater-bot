import { Request, Response } from "express";
export abstract class AbstractAction {
  abstract execute(req: Request, res: Response): void;
}
