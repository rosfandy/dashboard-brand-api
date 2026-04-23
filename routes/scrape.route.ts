import { Router } from "express";
import * as controller from "../controller/scrape.controller";

const scrapeRouter = Router();

scrapeRouter.get("/category", controller.scrapeCategory);
scrapeRouter.get("/category/:category/product", controller.scrapeProduct)

export default scrapeRouter;
