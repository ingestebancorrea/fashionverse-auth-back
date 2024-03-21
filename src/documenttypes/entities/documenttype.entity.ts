import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('documenttypes')
export class Documenttype {

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
        type:'bool',
    })
    is_active: boolean;
    
}
