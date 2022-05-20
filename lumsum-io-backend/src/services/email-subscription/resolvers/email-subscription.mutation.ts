import EmailSubscription from '../entity/EmailSubscription';
// https://github.com/typeorm/typeorm/blob/master/docs/entities.md
export default {
    Mutation: {
        subscribe: async (_: any, { email }: any) => {
            try {
                await EmailSubscription.findOneOrFail({ email });
                return true;
            } catch (error) {
                const emailSubscription = new EmailSubscription();
                emailSubscription.email = email;
                await emailSubscription.save();
                return true;
            }
        },
        unSubscribe: async (_: any, { email }: any) => {
            const emailSubscription = await EmailSubscription.findOne({ email });
            if (!emailSubscription) throw new Error("Email is not found!");
            emailSubscription.isSubscribe = false;
            return await emailSubscription.save();
        },
    }
}