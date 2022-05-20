import Supplier from "../../user/entity/Supplier";
import { getRepository } from "typeorm";
import moment from 'moment';
import Customer from "../../user/entity/Customer";
import Category from "../../category/entity/Category";
import Product from "../../product/entity/Product";

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export default {
    Query: {
        chartData: async (_: any, args: any) => {
            const startOfYear = moment(args.year).startOf('year').toISOString();
            const endOfYear = moment(args.year).endOf('year').toISOString();

            const no_of_suppliers = new Array(12).fill(0);
            const suppliers: any = await getRepository(Supplier)
                .createQueryBuilder("supplier")
                .select([])
                .addSelect("COUNT(supplier.id)", "supplier_no_of")
                .addSelect("DATE_FORMAT(supplier.createdAt, '%m')", "supplier_month")
                .where(`supplier.createdAt BETWEEN '${startOfYear}' AND '${endOfYear}'`)
                .addGroupBy('supplier_month')
                .orderBy('supplier_month')
                .getRawMany();

            suppliers.forEach((supplier: any) => {
                no_of_suppliers[parseInt(supplier.supplier_month) - 1] = supplier.supplier_no_of;
            });

            const no_of_customers = new Array(12).fill(0);
            const customers: any = await getRepository(Customer)
                .createQueryBuilder("customer")
                .select([])
                .addSelect("COUNT(customer.id)", "customer_no_of")
                .addSelect("DATE_FORMAT(customer.createdAt, '%m')", "customer_month")
                .where(`customer.createdAt BETWEEN '${startOfYear}' AND '${endOfYear}'`)
                .addGroupBy('customer_month')
                .orderBy('customer_month')
                .getRawMany();

            customers.forEach((customer: any) => {
                no_of_customers[parseInt(customer.customer_month) - 1] = customer.customer_no_of;
            });

            const no_of_categories = new Array(12).fill(0);
            const categories: any = await getRepository(Category)
                .createQueryBuilder("category")
                .select([])
                .addSelect("COUNT(category.id)", "category_no_of")
                .addSelect("DATE_FORMAT(category.createdAt, '%m')", "category_month")
                .where(`category.createdAt BETWEEN '${startOfYear}' AND '${endOfYear}'`)
                .addGroupBy('category_month')
                .orderBy('category_month')
                .getRawMany();

            categories.forEach((category: any) => {
                no_of_categories[parseInt(category.category_month) - 1] = category.category_no_of;
            });

            const no_of_products = new Array(12).fill(0);
            const products: any = await getRepository(Product)
                .createQueryBuilder("product")
                .select([])
                .addSelect("COUNT(product.id)", "product_no_of")
                .addSelect("DATE_FORMAT(product.createdAt, '%m')", "product_month")
                .where(`product.createdAt BETWEEN '${startOfYear}' AND '${endOfYear}'`)
                .addGroupBy('product_month')
                .orderBy('product_month')
                .getRawMany();

            products.forEach((product: any) => {
                no_of_products[parseInt(product.product_month) - 1] = product.product_no_of;
            });

            return {
                labels: monthNames,
                dataset: {
                    suppliers: no_of_suppliers,
                    users: no_of_customers,
                    categories: no_of_categories,
                    products: no_of_products
                }
            }
        }
    }
}