import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "./Material";

@Entity({name: 'estimates'})
export class Estimate extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id!: number

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
    
    @Column()
    tax!: number
}
