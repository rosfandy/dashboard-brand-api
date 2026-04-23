import prisma from "../config/prisma";

export const GetCategories = async () => {
    return prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { products: true },
    })
}

export const GetCategoryById = async (id: number) => {
    return prisma.category.findUnique({
        where: { id },
        include: { products: true },
    })
}
