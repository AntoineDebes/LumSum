import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";

@Entity("emailsubscription")
@Unique(["email"])
class EmailSubscription extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    email: string;

    @Column('boolean', { default: true })
    isSubscribe: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

}

export default EmailSubscription;