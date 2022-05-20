import { and, shield } from "graphql-shield";
import { isAdmin, isAuthenticated, isCustomer } from "./rules";

export default shield({
    Mutation: {
        addUser: and(isAuthenticated, isAdmin),
        addSupplier: and(isAuthenticated, isAdmin),
        addReview: and(isAuthenticated, isCustomer),
        addCategory: and(isAuthenticated, isAdmin),
        addProduct: and(isAuthenticated, isAdmin)
    }
});