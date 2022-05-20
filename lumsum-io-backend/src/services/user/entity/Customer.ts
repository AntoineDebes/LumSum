import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Length } from "class-validator";
import Review from "../../review/entity/Review";
import User from "./User";
import Supplier from "./Supplier";

@Entity("customers")
class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(3, 100)
  name: string;

  @Column({ nullable: true, default: null })
  avatar: string;

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

  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @OneToMany(() => Review, (review) => review.reviewBy)
  reviews: Promise<Review[]>;

  @ManyToMany(() => Supplier, {
    cascade: true,
  })
  @JoinTable({ name: "favorites" })
  favorites: Supplier[];
}

export default Customer;
