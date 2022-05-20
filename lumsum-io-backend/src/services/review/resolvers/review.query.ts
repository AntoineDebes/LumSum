// import { getLimitOffset } from "../../../utils/general.utils";
import { getRepository } from "typeorm";
import Review from "../entity/Review";

export default {
    Query: {
        reviews: async (_: any) => {
            // const { offset, limit } = getLimitOffset(args.take, args.skip);
            const reviews = await getRepository(Review)
                .createQueryBuilder("review")
                .leftJoinAndSelect("review.reviewBy", "reviewBy")
                .leftJoinAndSelect("review.reviewOn", "reviewOn")
                // .offset(offset)
                // .limit(limit)
                // .printSql()
                .getMany();
            console.log(reviews);
            return reviews;
        },
        getReviewsAsCustomer: async (_: any, __: any, context: any): Promise<any> => {
            console.log(context.currentUser);
            const reviews = await getRepository(Review)
                .createQueryBuilder("review")
                .leftJoinAndSelect("review.reviewBy", "reviewBy")
                .leftJoinAndSelect("review.reviewOn", "reviewOn")
                .where('reviewBy.id IN (:...ids)', { ids: [context.currentUser.id] })
                // .where('reviewBy.id = id', { id: context.currentUser.id })
                // .offset(offset)
                // .limit(limit)
                .printSql()
                .getMany();
            console.log({ reviews });
            return reviews;
        }
    }
}