import { UserInputError } from "apollo-server-errors";
import Competition from "../../competition/entity/Competition";

interface IAddToLeaderBoard {
    name: string;
    scores: number;
    images: number;
}

interface DeleteFromLeaderBoardArgs {
    id: string;
}

interface UpdateLeaderBoardArgs {
    id: string;
    name: string;
    scores: number;
    images: number;
}

export default {
    Mutation: {
        addToLeaderBoard: async (_: any, { name, scores, images }: IAddToLeaderBoard): Promise<boolean> => {
            try {
                const competition = new Competition();
                competition.name = name;
                competition.scores = scores;
                competition.images = images;
                await competition.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        deleteFromLeaderBoard: async (_: any, { id }: DeleteFromLeaderBoardArgs) => {
            try {
                const competition = await Competition.findOne(id);
                if (!competition) throw new UserInputError("Record does not exist!");
                await competition.remove();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        updateLeaderBoard: async (_: any, { id, name, scores, images }: UpdateLeaderBoardArgs): Promise<Competition> => {
            const competition = await Competition.findOne(id);
            if (!competition) throw new UserInputError("Record is not found");
            competition.name = name;
            competition.scores = scores;
            competition.images = images;
            await competition.save();
            return competition;
        },
    },
};
