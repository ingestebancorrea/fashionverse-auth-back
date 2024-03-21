import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, Generated} from "typeorm";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type:'uuid',
        unique: true,
        generated: 'uuid', // Specify that it's generated by the database
    })
    @Generated('uuid')
    user_uuid: string;

    @Column( {
        type:'varchar',
        unique: true
    })
    username: string;

    @Column({
        type:'varchar',
        nullable: true
    })
    password: string;

    @Column({
        type:'varchar',
    })
    full_name: string;

    @Column({
        type:'varchar',
    })
    sub: string;

    @Column({
        type:'varchar',
        nullable: true
    })
    image_url: string;

    @Column( {
        type:'bool',
        default: true
    })
    is_active: boolean;

    // Relación de uno a uno con la entidad Role
    @Column({
        type: 'int', 
    })
    id_role: number; 

    @Column({
        type: 'int', 
    })
    auth_provider_id: number; 

    @Column({
        type: 'int', 
    })
    auth_method_id: number; 

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.username = this.username.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}