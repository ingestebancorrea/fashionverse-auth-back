import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {

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
    lastname: string;
    
    @Column({
        type: 'int', 
    })
    id_documenttype: number; 

    @Column({
        type: 'varchar', 
    })
    identification_number: string;
    
    @Column({
        type: 'date', 
    })
    birth_date: Date;

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
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP' 
    })
    created_at: Date;


}
