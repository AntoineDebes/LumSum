import { UserInputError } from "apollo-server-express";
import { getRepository } from "typeorm";
import Category from "../entity/Category";
// import { getLimitOffset } from "../../../utils/general.utils";

export default {
    Query: {
        filterCategories: async (_: any, args: any) => {
            const whatAreYouLookingFor = args.whatAreYouLookingFor || "",
                category = args.category || "",
                city = args.city || "";
            console.log({ whatAreYouLookingFor, category, city })
            // const { offset, limit } = getLimitOffset(args.take, args.skip);
            const categories = await getRepository(Category)
                .createQueryBuilder("category")
                .where("LOWER(name) LIKE :name", { name: `${category.toLowerCase()}%` })
                // .leftJoin("category.products", "categoryProducts")
                // .andWhere("categoryProducts.name")
                // .offset(offset)
                // .limit(limit)
                // .printSql()
                .orderBy("category.createdAt", "ASC")
                .getMany();
            return categories;
        },
        categories: async (_: any) => {
            // const { offset, limit } = getLimitOffset(args.take, args.skip);
            const categories = await getRepository(Category)
                .createQueryBuilder("category")
                // .offset(offset)
                // .limit(limit)
                // .printSql()
                .orderBy("category.createdAt", "ASC")
                .getMany();
            return categories;
        },
        category: async (_: any, { id }: any) => {
            const category = await getRepository(Category)
                .createQueryBuilder("category")
                .where("category.id = :id", { id })
                // .printSql()
                .getOne();
            if (!category) throw new UserInputError("Category Not Found!");
            console.log(category);
            return category;
        }
    },
    Category: {
        products: async (parent: any) => {
            return await parent.products;
        }
    }
}