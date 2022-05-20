import csv from "csvtojson";
import { getRepository, createConnection } from "typeorm";
import Admin from "../src/services/admin/entity/Admin";
import Blog from "../src/services/blog/entity/Blog";
import Category from "../src/services/category/entity/Category";
import ContactUs from "../src/services/contact-us/entity/ContactUs";
import Customer from "../src/services/user/entity/Customer";
import EmailSubscription from "../src/services/email-subscription/entity/EmailSubscription";
import Product from "../src/services/product/entity/Product";
import User from "../src/services/user/entity/User";
import Supplier from "../src/services/user/entity/Supplier";
import Review from "../src/services/review/entity/Review";
import VisitorCount from "../src/services/count/entity/VisitorCount";
import SupplierImage from "../src/services/user/entity/SupplierImage";
import Competition from "../src/services/competition/entity/Competition";
import { exit } from "process";

const percentage = (a: number, b: number) => {
  process.stdout.write(`Data inserting... (${((a * 100) / b).toFixed(2)})%\r`);
};

let count = 0;
(async () => {
  try {
    await createConnection();
    console.log("DB Connected established!!");

    const admins = await csv().fromFile(__dirname + "/admins.csv");
    for (const admin of admins) {
      await getRepository(Admin).save({ ...admin, roles: [admin.role] });
      count += 1;
      percentage(count, admins.length);
    }
    console.info("Admin data inserted!");

    count = 0;
    const blogs = await csv().fromFile(__dirname + "/blogs.csv");
    for (const blog of blogs) {
      await getRepository(Blog).save({ ...blog, owner: blog.ownerId });
      count += 1;
      percentage(count, blogs.length);
    }
    console.info("Blog data inserted!");

    count = 0;
    const categories = await csv().fromFile(__dirname + "/categories.csv");
    const categoryProductMap: any = {};
    for (const category of categories) {
      const res = await getRepository(Category).save(category);
      categoryProductMap[category.id] = res.id;
      count += 1;
      percentage(count, categories.length);
    }
    console.info("Category data inserted!");

    count = 0;
    const contactus = await csv().fromFile(__dirname + "/contactus.csv");
    for (const contact of contactus) {
      await getRepository(ContactUs).save(contact);
      count += 1;
      percentage(count, contactus.length);
    }
    console.info("Contact data inserted!");

    count = 0;
    const customers = await csv().fromFile(__dirname + "/customers.csv");
    const customerUserMap: any = {};
    for (const customer of customers) {
      const res = await getRepository(Customer).save(customer);
      customerUserMap[customer.id] = res.id;
      count += 1;
      percentage(count, customers.length);
    }
    console.info("Customers data inserted!");

    count = 0;
    const emailsubscription = await csv().fromFile(
      __dirname + "/emailsubscription.csv"
    );
    for (const subscription of emailsubscription) {
      await getRepository(EmailSubscription).save(subscription);
      count += 1;
      percentage(count, emailsubscription.length);
    }
    console.info("Email Subscription data inserted!");

    count = 0;
    const products = await csv().fromFile(__dirname + "/products.csv");
    const productSlugMap: Record<string, string> = {};
    for (const product of products) {
      const categoryId = categoryProductMap[product.categoryId];

      const newProduct = new Product();
      newProduct.id = product.id;
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.icon = product.icon;
      newProduct.metaTitle = product.metaTitle;
      newProduct.metaDesc = product.metaDesc;
      newProduct.createdAt = product.createdAt;
      newProduct.updatedAt = product.updatedAt;
      newProduct.category = categoryId;
      await newProduct.save();
      productSlugMap[product.id] = newProduct.id;
      count += 1;
      percentage(count, products.length);
    }
    console.info("Products data inserted!");

    count = 0;
    const users = await csv().fromFile(__dirname + "/users.csv");
    for (const user of users) {
      const customerId = customerUserMap[user.customerId];
      const newuser = new User();
      newuser.id = user.id;
      newuser.email = user.email;
      newuser.password = user.password;
      newuser.loginType = user.loginType;
      newuser.role = user.role;
      newuser.createdAt = user.createdAt;
      newuser.updatedAt = user.updatedAt;
      newuser.customer = customerId;
      await newuser.save();
      count += 1;
      percentage(count, users.length);
    }
    console.info("Users data inserted!");

    count = 0;
    const suppliers = await csv().fromFile(__dirname + "/suppliers.csv");
    for (const supplier of suppliers) {
      await getRepository(Supplier).save({
        ...supplier,
        user: supplier.userId,
      });
      count += 1;
      percentage(count, suppliers.length);
    }
    console.info("Suppliers data inserted!");
    //
    // count = 0;
    // const products_suppliers = await csv().fromFile(
    //   __dirname + "/suppliers_products_products.csv"
    // );
    // for (const product_supplier of products_suppliers) {
    //   await getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into("suppliers_products_products")
    //     .values([
    //       {
    //         productsId: productSlugMap[product_supplier.productsId],
    //         suppliersId: product_supplier.suppliersId,
    //       },
    //     ])
    //     .execute();
    //   count += 1;
    //   percentage(count, products_suppliers.length);
    // }
    // console.log("Suppliers products data inserted!");
    //
    count = 0;
    const reviews = await csv().fromFile(__dirname + "/review.csv");
    for (const review of reviews) {
      delete review.createdAt;
      delete review.updatedAt;
      await getRepository(Review).save({
        ...review,
        reviewBy: review.reviewById,
        reviewOn: review.reviewOnId,
      });
      count += 1;
      percentage(count, reviews.length);
    }
    console.info("Reviews data inserted!");

    count = 0;
    const visitor_counts = await csv().fromFile(
      __dirname + "/visitor_count.csv"
    );
    for (const visitor_count of visitor_counts) {
      await getRepository(VisitorCount).save({ ...visitor_count });
      count += 1;
      percentage(count, visitor_counts.length);
    }
    console.info("Visitor count data inserted!");

    // count = 0;
    // const favorites = await csv().fromFile(__dirname + "/favorites.csv");
    // for (const favorite of favorites) {
    //   await getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into("favorites")
    //     .values([
    //       {
    //         customersId: favorite.customersId,
    //         suppliersId: favorite.suppliersId,
    //       },
    //     ])
    //     .execute();
    //   count += 1;
    //   percentage(count, favorites.length);
    // }
    // console.log("Favorites data inserted!");

    count = 0;
    const images = await csv().fromFile(__dirname + "/supplier_images.csv");
    for (const image of images) {
      await getRepository(SupplierImage).save({
        ...image,
        supplier: image.supplierId,
      });
      count += 1;
      percentage(count, images.length);
    }
    console.info("Supplier images data inserted!");

    count = 0;
    const competitions = await csv().fromFile(__dirname + "/competition.csv");
    for (const competition of competitions) {
      await getRepository(Competition).save({ ...competition });
      count += 1;
      percentage(count, competitions.length);
    }
    console.info("Competition data inserted!");
  } catch (error) {
    console.error(error);
  } finally {
    exit();
  }
})();
