import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class RegisterUserWithCredentialsDto {

    @ApiProperty({
        name:'alias_role',
        type:'string',
        description: 'Role with which the user is going to register (DOCENTE, ESTUDIANTE)'
    })
    @Length(3,50)
    @IsString()
    alias_role?:string;

    @ApiProperty({
        name:'name',
        type:'string',
        description: 'user name'
    })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    name?:string

    @ApiProperty({
        name:'lastname',
        type:'string',
        description: 'user latname'
    })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    lastname?:string

    @ApiProperty({
        name:'username',
        type:'string',
        description: 'user email'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(150)
    username:string

    @ApiProperty({
        name:'password',
        type:'string',
        description: 'user password'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(150)
    password:string;

}