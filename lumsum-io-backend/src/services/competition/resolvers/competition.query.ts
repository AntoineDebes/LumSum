import Competition from "../../competition/entity/Competition";

export default {
    Query: {
        getLeaderBoardAdmin: async () => {
            return await Competition.find({
                order: {
                    createdAt: "DESC",
                },
            });
        },
        getLeaderBoard: async () => {
            return await Competition.find({
                order: {
                    scores: "DESC",
                },
            });
        },
    },
};
