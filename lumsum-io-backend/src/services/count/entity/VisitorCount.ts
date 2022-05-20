import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("visitor_count")
class VisitorCount extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ default: 0 })
    counts: number;
}

export default VisitorCount;
