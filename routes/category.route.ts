import { Router } from "express";
import * as controller from "../controller/category.controller";

const categoryRouter = Router()

categoryRouter.get("/", controller.GetCategories)
categoryRouter.get("/:id", controller.GetCategoryById)

export default categoryRouter;