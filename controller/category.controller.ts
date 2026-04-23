import { Request, Response } from "express";
import * as service from "../service/category.service";

const GetCategories = async (_: Request, res: Response): Promise<void> => {
    try {
        const categories = await service.GetCategories()
        res.json({ data: categories })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

const GetCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid id" })
            return
        }

        const category = await service.GetCategoryById(id)
        if (!category) {
            res.status(404).json({ message: "Category not found" })
            return
        }

        res.json({ data: category })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

export { GetCategories, GetCategoryById }
