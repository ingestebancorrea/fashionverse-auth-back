import { City } from "src/cities/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('departments')
export class Department {

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

    @OneToMany(() => City, cities => cities.department,{onDelete: 'NO ACTION', onUpdate: 'NO ACTION', cascade:true})
    cities?: City[];
    
}
