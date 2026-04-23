import { Request, Response } from "express";
import * as service from "../service/scrape.service"

export const scrapeCategory = async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await service.ScrapeCategory()
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const scrapeProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.params.category as string
    
    if (!category) throw new Error("Category parameter is required")

    const data = await service.ScrapeProduct(category)
    res.json({ data });
  } catch (error) {
    res.status(500).json({message: "Internal server error", error})
  }
}