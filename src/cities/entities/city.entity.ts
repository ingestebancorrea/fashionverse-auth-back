import { Department } from "src/departments/entities/department.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cities')
export class City {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({
        type:'varchar',
        unique: true
    })
    name: string;

    @Column({
        type:'varchar',
        unique: true
    })
    alias: string;

    @Column({
        type:'int'
    })
    id_department: number;

    @ManyToOne(
        () => Department,
        department => department.cities,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    @JoinColumn([{ name: 'id_department', referencedColumnName: 'id' }])
    department?:Department;
    
}
