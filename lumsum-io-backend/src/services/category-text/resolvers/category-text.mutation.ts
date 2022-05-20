import CategoryText from "../entity/CategoryText";

interface IAddCategoryText {
  text: string;
}

const type = "CATEGORY_TEXT_TYPE";

export default {
  Mutation: {
    addCategoryText: async (_: any, args: IAddCategoryText): Promise<any> => {
      const { text } = args;
      try {
        const categoryText = await CategoryText.findOne({ type });
        if (categoryText) {
          categoryText.text = text;
          await categoryText.save();
          return categoryText;
        } else {
          const newCategoryText = new CategoryText();
          newCategoryText.type = type;
          newCategoryText.text = text;
          await newCategoryText.save();
          return newCategoryText;
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
