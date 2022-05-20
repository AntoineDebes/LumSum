interface IAdminLogin {
    email: string;
    password: string;
}

interface IAdminInput {
    email: string;
    password: string;
    name: string;
}

interface ICreateAdminArgs {
    adminInput: IAdminInput;
}