interface ISupplierProduct {
    productId: string;
    supplierId: string;
}

interface IAddUser {
    email: string;
}

interface IAddCustomer extends IAddUser {
    name: string;
}

interface IAddUserArgs {
    userInput: IAddCustomer;
}

interface IAddSupplierArgs {
    supplierInput: IAddSupplie;
}

interface IchangePassword {
    currentPassword: string;
    newPassword: string;
}

interface IUpdateAvatar {
    avatar: File;
}

enum UserRole {
    CUSTOMER = "CUSTOMER",
    SUPPLIER = "SUPPLIER"
}

enum LoginTypeEnum {
    FACEBOOK = "FACEBOOK",
    GOOGLE = "GOOGLE",
    GENERAL = "GENERAL"
}

interface ILoginWithFacebook {
    email: string;
    name: string;
    url: string;
    role: UserRole;
    loginType: LoginTypeEnum;
}

interface IRegisterAsCustomer {
    name: string;
    email: string;
    password: string;
}

interface IRegisterAsSupplier {
    tradeName: string;
    legalName: string;
    contactPerson: string;
    email: string;
    password: string;
}