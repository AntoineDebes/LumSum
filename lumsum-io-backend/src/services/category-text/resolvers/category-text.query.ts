import CategoryText from "../entity/CategoryText";
const type = "CATEGORY_TEXT_TYPE";

export default {
  Query: {
    getCategoryText: async () => {
      const categortText = await CategoryText.findOne({ type });
      return categortText;
    },
  },
};
