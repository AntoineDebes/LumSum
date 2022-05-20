import Admin from "../../admin/entity/Admin";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";

@Entity("blogs")
export default class Blog extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    cover: string;

    @ManyToOne(() => Admin, (owner) => owner.blogs)
    owner: Admin;

    @Column()
    thumbnail: string;
}
