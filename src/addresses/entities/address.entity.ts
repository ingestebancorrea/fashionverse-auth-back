import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('addresses')
export class Address {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'int', 
    })
    id_city: number; 

    @Column({
        type: 'int', 
    })
    id_department: number; 

    @Column({
        type:'varchar',
    })
    street: string;

    @Column({
        type:'varchar',
    })
    house_number: string;

    @Column({
        type:'varchar',
    })
    neighborhood: string;

    @Column({
        type:'varchar',
    })
    other_references: string;
    
}
