import { UserInputError } from "apollo-server-express";
import Product from "../entity/Product";
import Category from "../../category/entity/Category";
import User, { UserRole } from "../../user/entity/User";
import { IRemoveCategory } from "src/@types/category";

interface ISupplierProduct {
    productId: string;
    supplierId: string;
}

export default {
    Mutation: {
        addProduct: async (_: any, args: any): Promise<any> => {
            const { id, categoryId, name, desc, metaTitle, metaDesc, productText, icon } = args;
            const product = await Product.findOne({ id });
            if (product) throw new UserInputError("Product Id already exists!");
            const category = await Category.findOne({ id: categoryId });
            if (!category) throw new UserInputError("Category Not Found!");
            const newProduct = new Product();
            newProduct.id = id;
            newProduct.name = name;
            newProduct.description = desc;
            newProduct.metaTitle = metaTitle;
            newProduct.metaDesc = metaDesc;
            newProduct.category = Promise.resolve(category);
            newProduct.suppliers = [];
            newProduct.icon = icon;
            newProduct.productText = productText;
            return await newProduct.save();
        },
        updateProduct: async (_: any, args: any): Promise<any> => {
            const product = await Product.findOne({ id: args.id });
            if (!product) throw new UserInputError("Product not found!");
            const category = await Category.findOne({ id: args.categoryId });
            if (!category) throw new UserInputError("Category Not Found!");
            product.name = args.name;
            product.description = args.desc;
            product.metaTitle = args.metaTitle;
            product.metaDesc = args.metaDesc;
            product.category = Promise.resolve(category);
            product.icon = args.icon;
            product.productText = args.productText;
            return await product.save();
        },
        removeProduct: async (_: any, { id }: IRemoveCategory): Promise<any> => {
            const product = await Product.findOne({ id });
            if (!product) throw new UserInputError("Category Id Not Found");
            await product.remove();
            return {
                ...product,
                id,
                products: [],
            };
        },
        addSupplierToProduct: async (_: any, { productId, supplierId }: ISupplierProduct) => {
            const product = await Product.findOne({ id: productId });
            if (!product) throw new UserInputError("Product not found!");
            const supplier = await User.findOne({ id: supplierId });
            if (!supplier) throw new UserInputError("Supplier not found!");
            if (!supplier.role.includes(UserRole.SUPPLIER)) throw new UserInputError("Supplier not found!");
            try {
                await product.save();
                return true;
            } catch (error) {
                return false;
            }
        },
    },
};
