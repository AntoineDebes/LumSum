import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Customer from "../../user/entity/Customer";
import Supplier from "../../user/entity/Supplier";

@Entity("review")
class Review extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  review: string;

  @Column()
  rating: string;

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

  @ManyToOne(() => Customer, (customer) => customer.reviews, {
    onDelete: "CASCADE",
  })
  reviewBy: Promise<Customer>;

  @ManyToOne(() => Supplier, (supplier) => supplier.reviews, {
    onDelete: "CASCADE",
  })
  reviewOn: Promise<Supplier>;
}

export default Review;
