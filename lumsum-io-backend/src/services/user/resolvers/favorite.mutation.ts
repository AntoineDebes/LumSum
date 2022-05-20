import { UserInputError } from "apollo-server-express";
import Supplier from "../entity/Supplier";
import User from "../entity/User";

export default {
  Mutation: {
    toggleFavoriteSupplier: async (
      _: any,
      { supplierId }: any,
      context: any
    ): Promise<any> => {
      const user = await User.findOne({
        where: { email: context.currentUser.email },
        relations: ["customer", "customer.favorites"]
      });

      if (!user) throw new UserInputError("User not found!");

      const customer = await user?.customer
      if (!customer) throw new UserInputError("Customer not found!");
      const supplier = await Supplier.findOne({ id: supplierId });
      if (!supplier) throw new UserInputError("Supplier not found!");
      let status: string;
      if (
        customer.favorites.findIndex((s: Supplier) => s.id === supplierId) !==
        -1
      ) {
        customer.favorites = customer.favorites.filter(
          (s: Supplier) => s.id !== supplierId
        );
        supplier.likes = supplier.likes - 1;
        status = "REMOVE";
      } else {
        customer.favorites.push(supplier);
        status = "ADD";

        console.log(supplier)

        supplier.likes = supplier.likes + 1;
      }
      await customer.save();
      await supplier.save()
      return {
        status,
        supplier,
      };
    },
  },
};
