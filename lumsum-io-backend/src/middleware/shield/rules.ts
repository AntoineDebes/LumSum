import { rule } from "graphql-shield"
import { IContext } from "src/@types/context";
import { UserRole } from "../../services/user/entity/User";
import { AdminRole } from "../../services/admin/entity/Admin";

export const isAuthenticated = rule({ cache: 'contextual' })(
    async (_, __, ctx: IContext, ___) => {
        return ctx.currentUser !== null;
    },
)

export const isAdmin = rule({ cache: 'contextual' })(
    async (_, __, ctx: IContext, ___) => {
        return ctx.currentUser.role === AdminRole.ADMIN;
    },
)

export const isCustomer = rule({ cache: 'contextual' })(
    async (_, __, ctx: IContext, ___) => {
        console.log(ctx.currentUser.role);
        return ctx.currentUser.role === UserRole.CUSTOMER;
    },
)