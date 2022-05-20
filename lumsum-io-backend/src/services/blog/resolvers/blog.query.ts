import { UserInputError } from "apollo-server-express";
import Blog from "../entity/Blog";

interface BlogArgs {
  id: string;
}

interface BlogBySlugArgs {
  slug: string;
}

export default {
  Query: {
    blogs: async () => {
      const blogs = await Blog.find();
      return blogs;
    },
    blog: async (_: any, { id }: BlogArgs) => {
      const blog = await Blog.findOne(id);
      if (!blog) throw new UserInputError("Blog is not found");
      return blog;
    },
    blogBySlug: async (_: any, { slug }: BlogBySlugArgs) => {
      const blog = await Blog.findOne({ where: { slug } });
      if (!blog) throw new UserInputError("Blog is not found");
      return blog;
    },
  },
};
