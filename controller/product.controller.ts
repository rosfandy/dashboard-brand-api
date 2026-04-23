import { Request, Response } from "express";
import * as service from "../service/product.service";

export const GetProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.query.categoryId
            ? parseInt(req.query.categoryId as string, 10)
            : undefined

        if (categoryId !== undefined && isNaN(categoryId)) {
            res.status(400).json({ message: "Invalid categoryId" })
            return
        }
        const products = await service.GetProducts(categoryId)
        res.json({ data: products })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

export const GetProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid id" })
            return
        }

        const product = await service.GetProductById(id)
        if (!product) {
            res.status(404).json({ message: "Product not found" })
            return
        }

        res.json({ data: product })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}
