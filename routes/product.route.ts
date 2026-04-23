import { Router } from "express";
import * as controller from "../controller/product.controller";

const productRouter = Router()

productRouter.get("/", controller.GetProducts)
productRouter.get("/:id", controller.GetProductById)

export default productRouter;