import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authentication_methods')
export class AuthenticationMethod {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {
        type:'varchar',
        default: true,
        name:'name'
    })
    name: string;

    @Column( {
        type:'varchar',
        default: true,
        name:'alias'
    })
    alias: string;

    @Column( {
        type:'bool',
        default: true,
        name:'is_active'
    })
    is_active?: boolean;
    
}