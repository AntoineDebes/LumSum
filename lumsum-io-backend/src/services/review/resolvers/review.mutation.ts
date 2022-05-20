import { UserInputError } from "apollo-server-express";
import Supplier from "../../user/entity/Supplier";
import Customer from "../../user/entity/Customer";
// import User, { UserRole } from "../../user/entity/User";
import Review from "../entity/Review";

export default {
    Mutation: {
        addReview: async (_: any, { review, rating, supplierId }: any, context: any): Promise<any> => {
            const customer = await Customer.findOne({ id: context.currentUser.id });
            if (!customer) throw new UserInputError("Customer not found!");
            const supplier = await Supplier.findOne({ id: supplierId });
            if (!supplier) throw new UserInputError("Supplier not found!");
            const newReview = new Review();
            newReview.review = review;
            newReview.rating = rating;
            newReview.reviewOn = Promise.resolve(supplier);
            newReview.reviewBy = Promise.resolve(customer);
            // (await (await user.supplier).reviews).push(newReview);
            // await (await user.supplier).save();
            // (await (await customer!.customer).reviews).push(newReview);
            // await (await customer!.customer).save();
            const reviewRes: any = await newReview.save();
            return {
                ...reviewRes,
                reviewOn: reviewRes.__reviewOn__,
                reviewBy: reviewRes.__reviewBy__
            }
        },
        removeReview: async (_: any, args: any) => {
            const review = await Review.findOne({ id: args.id });
            if (!review) throw new UserInputError("Review not found!");
            try {
                await review.remove();
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}