import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estimate } from "./Estimate";

@Entity({name: 'users'})
export class User extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    username!: string

    @Column()
    password!: string

    @OneToMany(() => Estimate, (estimate:Estimate) => estimate.user)
    estimates!: Estimate[];
}