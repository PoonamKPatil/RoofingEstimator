import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estimate } from "./Estimate";

@Entity({name: 'materials'})
export class Material extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 36
    })
    materialId!: string

    @Column()
    type!: string

    @Column()
    coveragePerUnit!: number

    @OneToMany(() => Estimate, (estimate:Estimate) => estimate.material)
    estimates!: Estimate[];
}