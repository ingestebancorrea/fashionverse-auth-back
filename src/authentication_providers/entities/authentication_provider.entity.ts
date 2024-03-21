import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authentication_providers')
export class AuthenticationProvider {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {
        type:'varchar',
        name:'name'
    })
    name: string;

    @Column( {
        type:'varchar',
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