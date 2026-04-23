import { Router, Request, Response } from "express";

const helloRouter = Router();

helloRouter.get("/", (_: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

export default helloRouter;
