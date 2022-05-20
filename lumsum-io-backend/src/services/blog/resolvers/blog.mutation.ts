import { AuthenticationError, UserInputError } from "apollo-server-express";
import slugify from "slugify";
import { IContext } from "src/@types/context";
import Admin from "../../admin/entity/Admin";
import Blog from "../entity/Blog";

interface AddBlogArgs {
    title: string;
    body: string;
    cover: string;
    thumbnail: string;
}

interface UpdateBlogArgs {
    id: string;
    title: string;
    body: string;
    cover: string;
    thumbnail: string;
}

interface RemoveBlogArgs {
    id: string;
}

export default {
    Mutation: {
        // Add new Blog
        addBlog: async (_: any, { title, body, cover, thumbnail }: AddBlogArgs, { currentUser }: IContext): Promise<any> => {
            if (currentUser.access === "REVOKE") throw new AuthenticationError("Authentication Error");
            const owner = await Admin.findOne(currentUser.id);
            if (!owner) throw new AuthenticationError("Authentication Error");
            const slug = await getUniqueSlug(title);
            const blog = new Blog();
            blog.title = title;
            blog.slug = slug;
            blog.body = body;
            blog.owner = owner;
            blog.cover = cover;
            blog.thumbnail = thumbnail;
            await blog.save();
            return blog;
        },
        // Update blog
        updateBlog: async (_: any, { id, title, body, cover, thumbnail }: UpdateBlogArgs, { currentUser }: IContext): Promise<any> => {
            if (currentUser.access === "REVOKE") throw new AuthenticationError("Authentication Error");
            const blog = await Blog.findOne(id);
            if (!blog) throw new UserInputError("Blog is not found");
            blog.title = title;
            if (blog.slug !== slugify(title, { lower: true })) {
                blog.slug = await getUniqueSlug(title);
            }
            blog.body = body;
            blog.cover = cover;
            blog.thumbnail = thumbnail;
            await blog.save();
            return blog;
        },
        // Update blog
        removeBlog: async (_: any, { id }: RemoveBlogArgs, { currentUser }: IContext): Promise<any> => {
            if (currentUser.access === "REVOKE") throw new AuthenticationError("Authentication Error");
            const blog = await Blog.findOne(id);
            if (!blog) throw new UserInputError("Blog is not found");
            await blog.remove();
            return true;
        },
    },
};

const getUniqueSlug = (title: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            let slug = slugify(title, { lower: true });
            let i = 1;
            while (true) {
                const blog = await Blog.findOne({ where: { slug } });
                if (blog) {
                    slug = slugify(`${title} ${i}`, { lower: true });
                    i++;
                } else {
                    resolve(slug);
                    break;
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
