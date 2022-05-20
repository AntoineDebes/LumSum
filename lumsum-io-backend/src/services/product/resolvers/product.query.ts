import { UserInputError } from "apollo-server-express";
import Supplier from "../../user/entity/Supplier";
import { getRepository } from "typeorm";
import Product from "../entity/Product";

export default {
    Query: {
        products: async (_: any) => {
            const products = await getRepository(Product).createQueryBuilder("category").getMany();
            return products;
        },
        product: async (_: any, { id }: any) => {
            const product = await getRepository(Product)
                .createQueryBuilder("product")
                .where("product.id = :id", { id })
                .leftJoinAndSelect("product.suppliers", "supplier")
                .getOne();
            if (!product) throw new UserInputError("Product Not Found!");
            return product;
        },
        productSearch: async (_: any, args: any) => {
            const supplierIds: Array<String> = [];
            let suppliers: any = [];
            if (args.city === "All UAE") suppliers = await Supplier.find();
            else suppliers = await Supplier.find({ city: args.city });

            suppliers.forEach((item: any) => {
                supplierIds.push(item.id);
            });

            const qb = getRepository(Product).createQueryBuilder("product");
            qb.leftJoin("product.category", "productCategory");
            qb.leftJoin("product.suppliers", "productSuppliers");
            qb.where("LOWER(product.name) LIKE :name", { name: `%${args.whatAreYouLookingFor.toLowerCase()}%` });

            if (args.category && args.category !== "All Categories") {
                qb.andWhere("productCategory.id IN (:...categoryIds)", { categoryIds: [args.category] });
            }
            if (supplierIds.length) {
                qb.andWhere("productSuppliers.id IN (:...supplierIds)", { supplierIds });
            }
            const products = await qb.getMany();
            return products;
        },
        getProductsOfSupplier: async (_: any, args: any) => {
            const supplierIds = [args.id];
            args.city = "kolkata";
            console.log({ args });
            return await getRepository(Product)
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.suppliers", "productSuppliers")
                .where("productSuppliers.id IN (:...supplierIds)", { supplierIds })
                .printSql()
                .getMany();
        },
    },
    Product: {
        category: async (parent: any) => {
            return await parent.category;
        },
    },
};
