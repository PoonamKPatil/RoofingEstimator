import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "./Material";
import { User } from "./User";

@Entity({name: 'estimates'})
export class Estimate extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 36
    })
    estimateId!: string

    @Column({
        length: 1000
    })
    token!: string

    @Column()
    roofSquareFootage!: number

    @Column()
    pitch!: number

    @Column()
    bundleCoverage!: number

    @Column()
    wastePercentage!: number

    @Column()
    laborCost!: number

    @ManyToOne(() => Material, (material: Material) => material.estimates, {eager: true, nullable: true})
    material!: Material | null
    
    @ManyToOne(() => User, (user: User) => user.estimates, {eager: true, nullable: true})
    user!: User | null

    @Column()
    tax!: number
}
