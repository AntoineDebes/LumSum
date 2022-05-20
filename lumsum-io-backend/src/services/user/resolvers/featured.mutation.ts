import { AuthenticationError, UserInputError } from "apollo-server-express";
import { IContext } from "src/@types/context";
import Supplier from "../entity/Supplier";

interface FeaturedArgs {
  supplierId: string;
}

export default {
  Mutation: {
    featured: async (
      _: any,
      { supplierId }: FeaturedArgs,
      { currentUser }: IContext
    ): Promise<Supplier> => {
      if (currentUser.access === "REVOKE")
        throw new AuthenticationError("Authentication Error");
      const supplier = await Supplier.findOne(supplierId, {
        relations: ["user"],
      });
      if (!supplier) throw new UserInputError("Supplier is not found!");
      supplier.featured = supplier.featured ? false : true;
      await supplier.save();
      return supplier;
    },
  },
};
