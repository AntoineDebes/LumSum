import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsString } from "class-validator";
import Review from "../../review/entity/Review";
import Product from "../../product/entity/Product";
import User from "./User";
import SupplierImage from "./SupplierImage";

@Entity("suppliers")
class Supplier extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: string;

    @Column()
    @IsString()
    tradeName: string;

    @Column()
    @IsString()
    legalName: string;

    @Column({ nullable: true, default: null })
    city: string;

    @Column({ nullable: true, default: null })
    areaWithInCity: string;

    @Column({ nullable: true })
    landlineNumber: string;

    @Column({ nullable: true })
    mobileNumber: string;

    @Column()
    contactPerson: string;

    @Column({ nullable: true })
    website: string;

    @Column("jsonb", { nullable: true })
    socialMediaLinks: object;

    @Column({ type: "text", nullable: true, default: null })
    about: string;

    @Column({ type: "text", nullable: true, default: null })
    about_us: string;

    @Column()
    logo: string;

    @Column("integer", { default: 0 })
    likes: number;

    @Column({ nullable: true, default: null })
    tradeLicense: string;

    @Column({ nullable: true, default: null })
    listingAgreement: string;

    @Column("boolean", { default: false })
    featured: boolean;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    public updatedAt: Date;

    @ManyToOne(() => User, (user) => user.suppliers, {
        onDelete: "CASCADE",
    })
    user: User;

    @OneToMany(() => Review, (review) => review.reviewOn)
    reviews: Promise<Review[]>;

    @ManyToMany(() => Product, (product) => product.suppliers, {
        cascade: true,
    })
    @JoinTable()
    products: Promise<Product[]>;

    @OneToMany(() => SupplierImage, (image) => image.supplier)
    images: SupplierImage[];
}

export default Supplier;
