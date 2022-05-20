import { AuthenticationError, UserInputError } from "apollo-server-express";
import Admin, { AccessEnum, AdminRole } from "../entity/Admin";
import { generateToken } from "../../../utils/auth.utils";
import { IContext } from "src/@types/context";
import { compare } from "bcryptjs";
import Supplier from "../../user/entity/Supplier";
import SupplierImage from "../../user/entity/SupplierImage";

interface IAdminLogin {
  email: string;
  password: string;
}

interface AddAdminArgs {
  email: string;
  password: string;
  name: string;
}

interface UpdateAdminArgs {
  id: string;
  email: string;
  name: string;
}

interface RemoveAdminArgs {
  id: string;
}

interface IAdminInput {
  email: string;
  password: string;
  name: string;
}

interface ICreateAdminArgs {
  adminInput: IAdminInput;
}

interface ISupplierImage {
  id: string;
  image: string;
}

interface DeleteSupplierImageArgs {
  id: string;
}

export default {
  Mutation: {
    loginAsAdmin: async (_: any, args: IAdminLogin, { res }: IContext) => {
      console.log("passed");
      const { email, password } = args;
      const admin = await Admin.findOne({ email: email.toLocaleLowerCase() });
      if (!admin) throw new AuthenticationError("Invalid email or password!");
      const validPassword = await compare(password, admin.password);
      if (!validPassword)
        throw new AuthenticationError("Invalid email or password!");
      const payload = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        access: admin.access,
        lastLoggedin: admin.lastLoggedin,
      };
      admin.lastLoggedin = new Date();
      await admin.save();
      const accessToken = generateToken(
        payload,
        process.env.SECRET_KEY_ACCESS_TOKEN!
      );
      const refreshToken = generateToken(
        payload,
        process.env.SECRET_KEY_REFRESH_TOKEN!
      );
      res.cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      return {
        accessToken,
        refreshToken,
        admin: payload,
      };
    },
    createAdmin: async (_: any, args: ICreateAdminArgs) => {
      // For development purpose only
      const admin = new Admin();
      admin.email = args.adminInput.email;
      admin.name = args.adminInput.name;
      admin.password = args.adminInput.password;
      try {
        await admin.save();
        return true;
      } catch (error) {
        return false;
      }
    },
    // Add Admin => Only Super Admin can do it
    addAdmin: async (
      _: any,
      { email, password, name }: AddAdminArgs,
      { currentUser }: IContext
    ): Promise<Admin> => {
      console.log(currentUser);
      if (!currentUser) throw new AuthenticationError("Authentication Error");
      if (currentUser.role !== "SUPER_ADMIN")
        throw new AuthenticationError("Access Denied!");
      const isEmailExist = await Admin.findOne({
        where: { email: email.toLocaleLowerCase() },
      });
      if (isEmailExist) throw new UserInputError("Email is already taken");
      const admin = Admin.create({ email, password, name });
      await admin.save();
      return admin;
    },
    // Add Admin => Only Super Admin can do it
    updateAdmin: async (
      _: any,
      { id, email, name }: UpdateAdminArgs,
      { currentUser }: IContext
    ): Promise<Admin> => {
      if (!currentUser) throw new AuthenticationError("Authentication Error");
      if (currentUser.role !== "SUPER_ADMIN")
        throw new AuthenticationError("Access Denied!");
      const admin = await Admin.findOne(id);
      if (!admin) throw new UserInputError("Admin not found!");
      if (admin.email !== email) {
        // Check for new email
        const isEmailExist = await Admin.findOne({
          where: { email: email.toLocaleLowerCase() },
        });
        if (isEmailExist) throw new UserInputError("Email is already taken!");
      }
      admin.email = email;
      admin.name = name;
      await admin.save();
      return admin;
    },
    removeAdmin: async (
      _: any,
      { id }: RemoveAdminArgs,
      { currentUser }: IContext
    ): Promise<Boolean> => {
      if (!currentUser) throw new AuthenticationError("Authentication Error");
      if (currentUser.role !== "SUPER_ADMIN")
        throw new AuthenticationError("Access Denied!");
      const admin = await Admin.findOne(id);
      if (!admin || admin.role === AdminRole.SUPER_ADMIN)
        throw new UserInputError("Admin not found!");
      await admin.remove();
      return true;
    },
    accessAdmin: async (
      _: any,
      { id }: RemoveAdminArgs,
      { currentUser }: IContext
    ): Promise<Admin> => {
      if (!currentUser) throw new AuthenticationError("Authentication Error");
      if (currentUser.role !== "SUPER_ADMIN")
        throw new AuthenticationError("Access Denied!");
      const admin = await Admin.findOne(id);
      if (!admin || admin.role === AdminRole.SUPER_ADMIN)
        throw new UserInputError("Admin not found!");
      admin.access =
        admin.access === AccessEnum.GRANT
          ? AccessEnum.REVOKE
          : AccessEnum.GRANT;
      await admin.save();
      return admin;
    },
    addImageOfSupplier: async (_: any, { id, image }: ISupplierImage) => {
      const supplier = await Supplier.findOne(id);
      if (!supplier) throw new UserInputError("Supplier does not exist!");

      try {
        const supplierImage = new SupplierImage();
        supplierImage.image = image;
        supplierImage.supplier = supplier;
        await supplierImage.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    deleteSupplierImage: async (_: any, { id }: DeleteSupplierImageArgs) => {
      try {
        const supplierImage = await SupplierImage.findOne(id);
        if (!supplierImage) throw new UserInputError("Image does not exist!");
        await supplierImage.remove();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
