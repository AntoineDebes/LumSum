import Admin from "../entity/Admin";

interface AdminArgs {
    id: string;
}

export default {
    Query: {
        admins: async (): Promise<Array<Admin>> => {
            return await Admin.find({ where: { role: "ADMIN" } });
        },
        admin: async (_: any, { id }: AdminArgs): Promise<Admin | undefined> => {
            return await Admin.findOne({ where: { id, role: "ADMIN" } });
        },
    },
};
