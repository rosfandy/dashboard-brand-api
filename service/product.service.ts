import prisma from "../config/prisma";

export const GetProducts = async (categoryId?: number) => {
    return prisma.product.findMany({
        where: categoryId ? { categoryId } : undefined,
        include: { category: true },
        orderBy: { createdAt: "desc" },
    })
}

export const GetProductById = async (id: number) => {
    return prisma.product.findUnique({
        where: { id },
        include: { category: true },
    })
}
