import prisma from "../config/prisma";

export const GetCategories = async () => {
    return prisma.category.findMany({
        orderBy: { name: "asc" },
    })
}

export const GetCategoryById = async (id: number) => {
    return prisma.category.findUnique({ where: { id } })
}
