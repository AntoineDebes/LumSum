import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Product from "../../product/entity/Product";

@Entity("categories")
class Category extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    icon: string;

    @Column({ type: String, nullable: true})
    banner: string;

    @Column({ type: String, nullable: true})
    bannerMobile!: string;

    @Column({ type: String, nullable: true})
    bannerUrl!: string;

    @Column({type: Boolean, default: false})
    bannerActive: boolean;

    @Column('text')
    metaTitle: string;
    @Column('text')
    metaDesc: string;

    @Column({type: 'text', nullable:true})
    categoryText: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => Product, product => product.category)
    products: Promise<Product[]>;

}

export default Category;