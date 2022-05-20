import { Entity, Column, BaseEntity, ManyToOne, ManyToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn, JoinTable } from "typeorm";
import Category from "../../category/entity/Category";
import Supplier from "../../user/entity/Supplier";

@Entity("products")
class Product extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @Column()
    icon: string;

    @Column("text")
    metaTitle: string;

    @Column("text")
    metaDesc: string;

    @Column("text", {nullable:true})
    productText: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: "CASCADE",
    })
    @JoinTable()
    category: Promise<Category>;

    @ManyToMany(() => Supplier, (supplier) => supplier.products)
    suppliers: Supplier[];
}

export default Product;
