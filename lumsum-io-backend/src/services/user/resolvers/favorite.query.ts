import { UserInputError } from "apollo-server-express";
import User from "../entity/User";

export default {
  Query: {
    favoriteSupplier: async (
      _: any,
      __: any,
      context: any
    ): Promise<any> => {
      const user = await User.findOne({
        where: { email: context.currentUser.email },
        relations: ["customer", "customer.favorites"]
      });

      if (!user) throw new UserInputError("User not found!");

      const customer = await user?.customer

      if (!customer) throw new UserInputError("Customer not found!");
      return customer.favorites;
    },
  },
};
