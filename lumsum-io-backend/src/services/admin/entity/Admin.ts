import { genSaltSync, hashSync } from "bcryptjs";
import Blog from "../../blog/entity/Blog";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  BeforeInsert,
  OneToMany,
} from "typeorm";

export enum AdminRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum AccessEnum {
  GRANT = "GRANT",
  REVOKE = "REVOKE",
}

const salt = genSaltSync(10);

@Entity("admins")
@Unique(["email"])
class Admin extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastLoggedin: Date;

  @Column({
    type: "enum",
    enum: AdminRole,
    default: AdminRole.ADMIN,
  })
  role: AdminRole;

  @Column({
    type: "enum",
    enum: AccessEnum,
    default: AccessEnum.GRANT,
  })
  access: AccessEnum;

  @OneToMany(() => Blog, (blog) => blog.owner)
  blogs: Blog[];

  @BeforeInsert()
  hashPassword() {
    if (this.email) {
      this.email = this.email.toLocaleLowerCase();
    }
    if (this.password) {
      this.password = hashSync(this.password, salt);
    }
  }
}

export default Admin;
