import { Router } from "express";
import helloRouter from "./hello.route";
import scrapeRouter from "./scrape.route";
import categoryRouter from "./category.route";
import productRouter from "./product.route";

const router = Router();

router.use("/hello", helloRouter);
router.use("/scrape", scrapeRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

export default router;
