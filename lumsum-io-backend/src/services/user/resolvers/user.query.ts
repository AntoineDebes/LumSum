import {getRepository} from "typeorm";
import Supplier from "../entity/Supplier";
import Customer from "../entity/Customer";
import {UserInputError} from "apollo-server-express";
import Review from "../../review/entity/Review";
import User from "../entity/User";

export default {
    Query: {
        me: async (_: any, __: any, context: any): Promise<any> => {
            console.log(context.currentUser);
            let me: any = null;
            if (context.currentUser.role.includes("CUSTOMER")) {
                me = await User.findOne({
                    where: { email: context.currentUser.email },
                    relations: ["customer"]
                });

                const customer = await me.customer;
                return { ...me, ...customer  }
            }
            if (context.currentUser.role === "SUPPLIER") {
                me = await User.findOne({
                    where: { email: context.currentUser.email },
                    relations: ["supplier"]
                });

                const supplier = await me.supplier;
                return { ...me, ...supplier  }
            }
        },
        supplier: async (_: any, { id }: any) => {
            const supplier = await getRepository(Supplier)
                .createQueryBuilder("supplier")
                .where("supplier.id = :id", { id })
                .leftJoinAndSelect("supplier.user", "user")
                .leftJoinAndSelect("supplier.products", "products")
                .leftJoinAndSelect("supplier.reviews", "reviews")
                .leftJoinAndSelect("supplier.images", "supplier_images")
                .orderBy("supplier_images.createdAt", "DESC")
                .getOne();
            if (!supplier) throw new UserInputError("Supplier Not Found!");
            return { ...supplier, ...supplier.socialMediaLinks, about: supplier.about_us };
        },
        getSuppliersOfProduct: async (_: any, args: any) => {
            console.log("getSuppliersOfProduct", args);
            const productIds = [args.id];
            const qb = getRepository(Supplier).createQueryBuilder("supplier");
            if (args.city && args.city !== "All UAE") {
                qb.where("LOWER(supplier.city) LIKE :city", { city: `%${args.city.toLowerCase()}%` });
            }
            qb.leftJoinAndSelect("supplier.products", "supplierProducts");
            qb.leftJoinAndSelect("supplier.reviews", "reviews");
            qb.orderBy("supplier.featured", "DESC");
            qb.andWhere("supplierProducts.id IN (:...productIds)", { productIds });
            return await qb.getMany();
        },
        getReviewsOfSupplier: async (_: any, args: any) => {
            return await getRepository(Review)
                .createQueryBuilder("review")
                .leftJoinAndSelect("review.reviewBy", "reviewBy")
                .leftJoinAndSelect("review.reviewOn", "reviewOn")
                .where("review.reviewOn.id = :id", {id: args.id})
                .getMany();
        },
        users: async (_: any) => {
            return await getRepository(Customer)
                .createQueryBuilder("customer")
                .leftJoinAndSelect("customer.user", "user")
                .orderBy("customer.createdAt", "ASC")
                .getMany();
        },
        user: async (_: any, { id }: any) => {
            const customer = await getRepository(Customer)
                .createQueryBuilder("customer")
                .where("customer.id = :id", { id })
                .leftJoinAndSelect("customer.user", "user")
                .leftJoinAndSelect("customer.reviews", "reviews")
                .getOne();
            if (!customer) throw new UserInputError("Supplier Not Found!");
            return customer;
        },
    },
    Supplier: {
        products: async (parent: any) => {
            return parent.__products__;
        },
        avgRating: async (parent: any) => {
            let rating = 0;
            const noOfReview = parseFloat(parent.__reviews__.length);
            if (!noOfReview) return 0;
            parent.__reviews__.map((review: any) => {
                rating += parseFloat(review.rating);
            });
            return rating / noOfReview;
        },
    },
};
