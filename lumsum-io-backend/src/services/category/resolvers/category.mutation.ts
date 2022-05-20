import { UserInputError } from "apollo-server-express";
import Category from "../entity/Category";
import { IAddCategory, IRemoveCategory, IUpdateCategory } from "src/@types/category";
//import {runInNewContext} from "vm";

export default {
    Mutation: {
        addCategory: async (_: any, args: IAddCategory): Promise<any> => {
            const { id, name, desc, icon, metaTitle, metaDesc, categoryText } = args;
            const category = await Category.findOne({ id });
            if (category) throw new UserInputError("Category Id already exists!");
            const newCategory = new Category();
            newCategory.id = id;
            newCategory.name = name;
            newCategory.description = desc;
            newCategory.metaTitle = metaTitle;
            newCategory.metaDesc = metaDesc;
            newCategory.categoryText = categoryText;
            newCategory.banner = args.banner;
            newCategory.bannerMobile = args.bannerMobile;
            newCategory.bannerActive = args.bannerActive;
            newCategory.bannerUrl = args.bannerUrl;
            newCategory.products = Promise.resolve([]);
            newCategory.icon = icon;
            return {
                ...(await newCategory.save()),
                products: [],
            };
        },
        updateCategory: async (_: any, args: IUpdateCategory): Promise<any> => {
            console.log({ args });
            const category = await Category.findOne({ id: args.id });
            if (!category) throw new UserInputError("Category Id Not Found");
            category.name = args.name;
            category.description = args.desc;
            category.metaTitle = args.metaTitle;
            category.metaDesc = args.metaDesc;
            category.banner = args.banner;
            category.bannerMobile = args.bannerMobile;
            category.bannerActive = args.bannerActive;
            category.bannerUrl = args.bannerUrl;
            category.categoryText = args.categoryText;
            category.icon = args.icon;
            return await category.save();
        },
        removeCategory: async (_: any, args: IRemoveCategory): Promise<any> => {
            const category = await Category.findOne({ id: args.id });
            if (!category) throw new UserInputError("Category Id Not Found");
            await category.remove();
            return {
                ...category,
                id: args.id,
                products: [],
            };
        },
    },
};
