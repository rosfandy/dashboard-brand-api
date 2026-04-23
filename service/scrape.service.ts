import * as cheerio from "cheerio";
import prisma from "../config/prisma";
import { launchBrowser, DEFAULT_USER_AGENT } from "../config/puppeteer";
import { ParsePrice, ParseSold } from "../utils/scrape";

export type Category = {
    name: string
    slug: string
}

export type Product = {
    name: string
    slug: string
    price: number
    imageUrl: string
    sold: number
    rating: number
    categoryId: number
}

const EXCLUDED_CATEGORIES = ["produk terjual", "spesial diskon", "diskonpromo"]

export const ScrapeCategory = async (): Promise<Category[]> => {
    const browser = await launchBrowser()

    try {
        const url = "https://www.tokopedia.com/novoidminds/product"
        const page = await browser.newPage()

        await page.setUserAgent(DEFAULT_USER_AGENT)
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })
        await page.waitForSelector("li.css-1kjnthc", { timeout: 10000 })

        const html = await page.content()
        const $ = cheerio.load(html)

        const categories: Category[] = []

        $("li.css-1kjnthc a, li.css-1c0j98e a").each((_, el) => {
            const name = $(el).text().trim()
            const href = $(el).attr("href") ?? ""

            if (EXCLUDED_CATEGORIES.includes(name.toLowerCase())) return

            const slug = href.split("/etalase/")[1] ?? ""
            if (!slug) return

            categories.push({ name, slug })
        })

        await insertCategories(categories)
        return categories
    } catch (error) {
        console.error(error)
        throw new Error(`Failed to scrape categories: ${error}`)
    } finally {
        await browser.close()
    }
}

export const ScrapeProduct = async (category: string): Promise<void> => {
    console.log(`[scrape] starting product scrape for category: "${category}"`)
    const browser = await launchBrowser()

    try {
        const url = "https://www.tokopedia.com/novoidminds/etalase/" + category
        console.log(`[scrape] navigating to: ${url}`)
        const page = await browser.newPage()

        await page.setUserAgent(DEFAULT_USER_AGENT)
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })
        console.log(`[scrape] page loaded, waiting for product selector...`)
        await page.waitForSelector(".css-tjjb18", { timeout: 10000 })
        console.log(`[scrape] product cards found`)

        const html = await page.content()
        const $ = cheerio.load(html)
        const products: Product[] = []

        const categoryRecord = await prisma.category.findUnique({ where: { slug: category } })
        if (!categoryRecord) throw new Error(`Category not found: ${category}`)
        console.log(`[scrape] category resolved: id=${categoryRecord.id}, name="${categoryRecord.name}"`)

        const cardCount = $(".css-tjjb18 .css-79elbk a").length
        console.log(`[scrape] total product cards found: ${cardCount}`)

        $(".css-tjjb18 .css-79elbk a").each((i, el) => {
            const href = $(el).attr("href") ?? ""
            const slug = href.split("?")[0].split("/").pop() ?? ""
            const name = $(el).find("span[class*='tnoqZhn']").text().trim()
            const price = ParsePrice($(el).find("div[class*='urMOIDHH']").text())
            const imageUrl = $(el).find("img[alt='product-image']").attr("src") ?? ""
            const sold = ParseSold($(el).find("span[class*='u6SfjDD']").text())
            const rating = parseFloat($(el).find("span[class*='_2NfJxPu']").text()) || 0

            console.log(`[scrape] card[${i}] slug="${slug}" name="${name}" price=${price} rating=${rating} sold=${sold}`)

            if (!slug || !name) {
                console.warn(`[scrape] card[${i}] skipped — missing slug or name`)
                return
            }

            products.push({ name, slug, price, imageUrl, sold, rating, categoryId: categoryRecord.id })
        })

        console.log(`[scrape] parsed ${products.length} valid products, inserting to DB...`)
        await insertProducts(products)
        console.log(`[scrape] done — ${products.length} products inserted for category "${category}"`)
    } catch (error) {
        console.error(`[scrape] error:`, error)
        throw new Error(`Failed to scrape products: ${error}`)
    } finally {
        await browser.close()
        console.log(`[scrape] browser closed`)
    }
}

const insertCategories = async (categories: Category[]): Promise<void> => {
    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
    })
}

const insertProducts = async (products: Product[]): Promise<void> => {
    await prisma.product.createMany({
        data: products,
        skipDuplicates: true,
    })
}