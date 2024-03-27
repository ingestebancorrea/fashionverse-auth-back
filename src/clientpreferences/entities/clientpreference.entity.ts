import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientpreferences')
export class Clientpreference {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({
        type:'int'
    })
    id_client: number;

    @Column({
        type:'int'
    })
    id_preference: number;

}
