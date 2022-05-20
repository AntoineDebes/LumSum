import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("competition")
class Competition extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column({ default: 0 })
    scores: number;

    @Column({ default: 0 })
    images: number;

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
}

export default Competition;
