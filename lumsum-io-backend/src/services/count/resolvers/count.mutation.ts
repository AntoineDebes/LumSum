import { getRepository } from "typeorm";
import VisitorCount from "../../count/entity/VisitorCount";

export default {
    Mutation: {
        addVisitorCount: async (): Promise<number> => {
            try {
                let visitors = 0;
                const visitorsData = await getRepository(VisitorCount).find({ take: 1 });
                if (visitorsData && visitorsData.length > 0) {
                    visitorsData[0].counts = visitorsData[0].counts + 1;
                    await visitorsData[0].save();
                    visitors = visitorsData[0].counts;
                } else {
                    await VisitorCount.create({ counts: 1 }).save();
                    visitors = 1;
                }

                return visitors;
            } catch (error) {
                throw error;
            }
        },
    },
};
