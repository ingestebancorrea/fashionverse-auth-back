import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('storestype')
export class Storestype {

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
