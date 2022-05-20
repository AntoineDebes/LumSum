import { getRepository } from "typeorm";
import Supplier from "../entity/Supplier";

interface SupplierArgs {
    search?: string;
}

export default {
    Query: {
        suppliers: async (_: any, { search }: SupplierArgs) => {
            const qb = getRepository(Supplier).createQueryBuilder("supplier");
            qb.leftJoinAndSelect("supplier.user", "user");
            qb.where("LOWER(supplier.tradeName) LIKE :searchTerm", { searchTerm: `%${search?.toLowerCase() || ""}%` });
            const suppliers = await qb.getMany();
            return suppliers;
        },
    },
};
