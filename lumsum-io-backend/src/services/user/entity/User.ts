import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Unique,
    OneToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import { genSaltSync, hashSync } from "bcryptjs";
import Customer from "./Customer";
import Supplier from "./Supplier";

export enum UserRole {
    CUSTOMER = "CUSTOMER",
    SUPPLIER = "SUPPLIER",
}

export enum LoginTypeEnum {
    FACEBOOK = "FACEBOOK",
    GOOGLE = "GOOGLE",
    GENERAL = "GENERAL",
}

const salt = genSaltSync(10);

@Entity("users")
@Unique(["email"])
class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ nullable: true })
    @Length(8, 100)
    password: string;

    @Column({
        type: "enum",
        enum: LoginTypeEnum,
        default: LoginTypeEnum.GENERAL,
    })
    loginType: LoginTypeEnum;

    @Column({
        type: "jsonb",
        enum: UserRole,
        default: [UserRole.CUSTOMER],
    })
    role: UserRole[];

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

    @OneToOne(() => Customer, (customer) => customer.user, {
        cascade: true,
    })
    @JoinColumn()
    customer: Promise<Customer>;

    @OneToMany(() => Supplier, (supplier) => supplier.user, {
        cascade: true,
    })
    @JoinColumn()
    suppliers: Supplier[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.email) {
            this.email = this.email.toLocaleLowerCase();
        }
        if (this.password) {
            this.password = hashSync(this.password, salt);
        }
    }
}

export default User;
