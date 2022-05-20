type UserRole = "CUSTOMER" | "SUPPLIER";

interface ICustomerRegister {
    name: string;
    email: email;
    password: string,
    role: UserRole
}

interface ISupplierRegister extends ICustomerRegister {
    companyName: string;
    designation: string;
}