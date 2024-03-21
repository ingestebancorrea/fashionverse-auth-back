import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('stores')
export class Store {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({
        type:'varchar',
    })
    name: string;

    @Column({
        type:'varchar',
    })
    cellphone: string;

    @Column({
        type: 'bool', 
    })
    is_active: boolean;

    @Column({
        type: 'uuid', 
    })
    user_uuid: string; 

    @Column({
        type: 'int', 
    })
    id_address: number;

    @Column({
        type: 'int', 
    })
    id_storetype: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP' 
    })
    created_at: Date;
    
}
