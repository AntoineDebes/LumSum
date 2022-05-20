import { AuthenticationError, UserInputError } from "apollo-server-express";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { validate } from "class-validator";
import { errorConfigure } from "../../../utils/errors.utils";
import { generateToken } from "../../../utils/auth.utils";
import User, { UserRole, LoginTypeEnum } from "../entity/User";
import Customer from "../entity/Customer";
import Supplier from "../entity/Supplier";
import { IContext } from "src/@types/context";
import { storeFS } from "../../../utils/helper.utils";
import Product from "../../product/entity/Product";
import { getRepository } from "typeorm";
import Admin from "../../admin/entity/Admin";
import sendCreateAccountEmail from "../../../email/sendCreateAccountEmail";

const salt = genSaltSync(10);
interface IPayload {
    id: string;
    email: string;
    role: Array<any>;
    name: string;
    loginType: LoginTypeEnum;
}

interface ILoginWithFacebook {
    email: string;
    name: string;
    url: string;
    role: UserRole;
    loginType: LoginTypeEnum;
}

interface IAdminLogin {
    email: string;
    password: string;
}

interface IchangePassword {
    currentPassword: string;
    newPassword: string;
}

interface IUpdateAvatar {
    avatar: any;
}

interface IRegisterAsCustomer {
    name: string;
    email: string;
    password: string;
}

export default {
    Mutation: {
        loginWithSocial: async (_: any, { email, name, url, role, loginType }: ILoginWithFacebook, { res }: IContext) => {
            let user: User | undefined;
            try {
                // email exist or not
                user = await User.findOne({ email: email.toLocaleLowerCase() });
                // create facebook user
                if (!user) {
                    user = new User();
                    user.email = email;
                    user.loginType = loginType;
                    user.role = [role];
                    if (user.role.includes(UserRole.CUSTOMER)) {
                        const customer = new Customer();
                        customer.name = name;
                        customer.avatar = url;
                        user.customer = Promise.resolve(customer);
                    }
                    if (user.role.includes(UserRole.SUPPLIER)) {
                        const supplier = new Supplier();
                        supplier.contactPerson = name;
                        user.suppliers = [supplier];
                    }
                    await user.save();
                }
                if (user.loginType !== loginType) {
                    throw new Error("Email already taken!");
                }
                console.log({ user });
            } catch (error) {
                throw error;
            }
            const payload: IPayload = {} as IPayload;
            payload.email = user.email;
            payload.role = user.role;
            payload.loginType = user.loginType;

            const accessToken = generateToken(payload, process.env.SECRET_KEY_ACCESS_TOKEN!);
            const refreshToken = generateToken(payload, process.env.SECRET_KEY_REFRESH_TOKEN!);
            res.cookie("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
            });
            return {
                accessToken,
                refreshToken,
            };
        },
        login: async (_: any, { email, password }: IAdminLogin, { res }: IContext) => {
            const user = await User.findOne({ email: email.toLocaleLowerCase() });
            console.log(compareSync(password, user ? user.password : ''), password, user);
            if (!user) throw new AuthenticationError("Invalid email or password!");
            if (!(compareSync(password, user.password))) throw new AuthenticationError("Invalid Password!");
            const payload: IPayload = {} as IPayload;
            payload.email = user.email;
            payload.role = user.role;

            const accessToken = generateToken(payload, process.env.SECRET_KEY_ACCESS_TOKEN!);
            const refreshToken = generateToken(payload, process.env.SECRET_KEY_REFRESH_TOKEN!);
            res.cookie("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
            });
            return {
                accessToken,
                refreshToken,
            };
        },
        registerAsCustomer: async (_: any, args: IRegisterAsCustomer, { res }: IContext) => {
            const user = new User();
            user.email = args.email;
            user.password = args.password;
            const customer = new Customer();
            customer.name = args.name;
            user.customer = Promise.resolve(customer);
            const errors = [...(await validate(user)), ...(await validate(customer))];
            if (errors.length)
                throw new UserInputError("ValidationError", {
                    errors: errorConfigure(errors),
                });
            const userExist = await User.findOne({ email: user.email });
            if (userExist) throw new UserInputError(`User already exist with ${user.email} email!`);
            try {
                await user.save();

                const payload: IPayload = {} as IPayload;
                payload.email = user.email;
                payload.role = user.role;
                payload.loginType = user.loginType;
                payload.id = customer.id;
                payload.name = customer.name;
                const accessToken = generateToken(payload, process.env.SECRET_KEY_ACCESS_TOKEN!);
                const refreshToken = generateToken(payload, process.env.SECRET_KEY_REFRESH_TOKEN!);
                res.cookie("refreshToken", refreshToken, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                });
                return {
                    accessToken,
                    refreshToken,
                };
            } catch (error) {
                throw error;
            }
        },
        addUser: async (_: any, args: any): Promise<boolean> => {
            const user = new User();
            user.email = args.email;
            user.password = "12345678";
            const customer = new Customer();
            customer.name = args.name;
            customer.avatar = args.avatar;
            user.customer = Promise.resolve(customer);
            const errors = [...(await validate(user)), ...(await validate(customer))];
            if (errors.length)
                throw new UserInputError("ValidationError", {
                    errors: errorConfigure(errors),
                });
            const userExist = await User.findOne({ email: user.email });
            if (userExist) throw new UserInputError(`User already exist with ${user.email} email!`);

            try {
                await user.save();
                await sendCreateAccountEmail(user.email, {
                    email: user.email,
                    password: args.password,
                    name: args.name,
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        addSupplier: async (_: any, args: any) => {
            const supplier = new Supplier();
            supplier.date = args.date;
            supplier.tradeName = args.tradeName;
            supplier.legalName = args.legalName;
            supplier.city = args.city;
            supplier.areaWithInCity = args.areaWithInCity;
            if (args.landlineNumber) supplier.landlineNumber = args.landlineNumber.substring(1);
            if (args.mobileNumber) supplier.mobileNumber = args.mobileNumber.substring(1);
            supplier.contactPerson = args.contactPerson;
            if (args.website) {
                supplier.website = args.website.href;
            }
            supplier.about = args.about;
            supplier.about_us = args.about;
            supplier.reviews = Promise.resolve([]);
            supplier.products = Promise.resolve([]);
            supplier.socialMediaLinks = {};
            if (args.socialMediaLinks) {
                supplier.socialMediaLinks = args.socialMediaLinks;
            }
            supplier.logo = args.logo;
            if (args.tradeLicense) {
                supplier.tradeLicense = args.tradeLicense;
            }
            if (args.listingAgreement) {
                supplier.listingAgreement = args.listingAgreement;
            }
            supplier.products = Promise.resolve(await Product.findByIds(args.products));

            const userExist = await User.findOne(
                { email: args.email },
                {
                    relations: ["suppliers"],
                }
            );
            console.log(userExist);
            if (!userExist) {
                // New Supplier Created
                const user = new User();
                user.email = args.email;
                user.password = "12345678";
                user.role = [UserRole.SUPPLIER];
                user.suppliers = [supplier];
                await supplier.save();
                await user.save();
                return true;
            } else if (userExist.role.includes(UserRole.SUPPLIER)) {
                userExist.suppliers.push(supplier);
                await supplier.save();
                await userExist.save();
                return true;
            } else if (userExist.role.includes(UserRole.CUSTOMER)) {
                // Add Customer as Supplier also
                userExist.role.push(UserRole.SUPPLIER);
                userExist.suppliers = [supplier];
                await supplier.save();
                await userExist.save();
                return true;
            }
            return false;
        },
        updateUser: async (_: any, args: any) => {
            const customer = await Customer.findOne({ id: args.id });
            if (!customer) throw new UserInputError("User does not exist!");
            customer.name = args.name;
            customer.avatar = args.avatar;
            try {
                await customer.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        updateSupplier: async (_: any, args: any) => {
            const supplier = await Supplier.findOne({ id: args.id });
            if (!supplier) throw new UserInputError("Supplier does not exist!");
            supplier.date = args.date;
            supplier.tradeName = args.tradeName;
            supplier.legalName = args.legalName;
            supplier.city = args.city;
            supplier.areaWithInCity = args.areaWithInCity;
            if (args.landlineNumber) supplier.landlineNumber = args.landlineNumber.substring(1);
            if (args.mobileNumber) supplier.mobileNumber = args.mobileNumber.substring(1);
            supplier.contactPerson = args.contactPerson;
            if (args.website) supplier.website = args.website.href;
            supplier.about = args.about;
            supplier.about_us = args.about;
            supplier.socialMediaLinks = {};
            if (args.socialMediaLinks) {
                supplier.socialMediaLinks = args.socialMediaLinks;
            }
            supplier.logo = args.logo;
            supplier.tradeLicense = args.tradeLicense;
            supplier.listingAgreement = args.listingAgreement;
            try {
                await supplier.save();
                return true;
            } catch (error) {
                // throw error;
                console.log(error);
                return false;
            }
        },
        removeUser: async (_: any, args: any) => {
            const customer = await getRepository(Customer)
                .createQueryBuilder("customer")
                .where("customer.id = :id", { id: args.id })
                .leftJoinAndSelect("customer.user", "user")
                .getOne();
            if (!customer) throw new UserInputError("Supplier does not exist!");
            try {
                await User.delete({ id: customer.user.id });
                await Customer.delete({ id: args.id });
                return true;
            } catch (error) {
                return false;
            }
        },
        removeSupplier: async (_: any, args: any) => {
            const supplier = await getRepository(Supplier)
                .createQueryBuilder("supplier")
                .where("supplier.id = :id", { id: args.id })
                .leftJoinAndSelect("supplier.user", "user")
                .getOne();
            if (!supplier) throw new UserInputError("Supplier does not exist!");
            try {
                await User.delete({ id: supplier.user.id });
                await Supplier.delete({ id: args.id });
                return true;
            } catch (error: any) {
                console.error(error);
                throw new Error(error);
                return false;
            }
        },
        updateProductsOfSupplier: async (_: any, args: any) => {
            const { id, products } = args;
            const supplier = await Supplier.findOne({ id });
            if (!supplier) throw new UserInputError("Supplier does not exist!");
            supplier.products = Promise.resolve(await Product.findByIds(products));
            
            try {
                await supplier.save();
                return true;
            } catch (error) {
                throw error;
                return false;
            }
        },
        changePasswordAsAdmin: async (_: any, args: IchangePassword, context: IContext) => {
            const admin = await Admin.findOne({ id: context.currentUser.id });
            if (!admin) throw new AuthenticationError("Access denied");
            if (!(compareSync(args.currentPassword, admin.password))) throw new AuthenticationError("Current Password is incorrect.");
            console.log(args);
            admin.password = hashSync(args.newPassword, salt);
            try {
                await admin.save();
                return true;
            } catch (error) {
                throw error;
            }
        },
        updateAvatar: async (_: any, args: IUpdateAvatar, context: IContext) => {
            try {
                if (context.currentUser.role === UserRole.CUSTOMER) {
                    const customer = await Customer.findOne({
                        id: context.currentUser.id,
                    });
                    if (!customer) throw new Error("User not authenticated");
                    if (args.avatar && typeof args.avatar === "object") {
                        const { createReadStream, filename } = await args.avatar;
                        const stream = createReadStream();
                        const res = (await storeFS({ stream, filename })) as any;
                        customer.avatar = res.filename;
                    }
                    await customer.save();
                    return true;
                }

                if (context.currentUser.role === UserRole.SUPPLIER) {
                    const supplier = await Supplier.findOne({
                        id: context.currentUser.id,
                    });
                    if (!supplier) throw new Error("User not authenticated");
                    if (args.avatar && typeof args.avatar === "object") {
                        const { createReadStream, filename } = await args.avatar;
                        const stream = createReadStream();
                        const res = (await storeFS({ stream, filename })) as any;
                        supplier.logo = res.filename;
                    }
                    await supplier.save();
                    return true;
                }

                return false;
            } catch (error) {
                throw error;
            }
        },
    },
};
