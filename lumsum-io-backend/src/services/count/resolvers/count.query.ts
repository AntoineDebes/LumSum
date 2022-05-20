import { getRepository } from "typeorm";
import Customer from "../../user/entity/Customer";
import Supplier from "../../user/entity/Supplier";
import Product from "../../product/entity/Product";
import Review from "../../review/entity/Review";
import VisitorCount from "../../count/entity/VisitorCount";

interface ICount {
    visitors: number;
    users: number;
    suppliers: number;
    products: number;
    reviews: number;
}

export default {
    Query: {
        counts: async (): Promise<ICount> => {
            let visitors = 0;
            const visitorsData = await getRepository(VisitorCount).find({ take: 1 });
            if (visitorsData && visitorsData.length > 0) visitors = visitorsData[0].counts;

            const users = await getRepository(Customer).count();
            const suppliers = await getRepository(Supplier).count();
            const products = await getRepository(Product).count();
            const reviews = await getRepository(Review).count();

            return {
                users,
                suppliers,
                products,
                reviews,
                visitors,
            };
        },
    },
};
