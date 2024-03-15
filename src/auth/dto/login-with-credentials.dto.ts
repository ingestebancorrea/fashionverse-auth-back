import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginWithCredentialsDto {

    @ApiProperty({
        name:'username',
        type:'string',
        description:'User name for login: is an email'
      })
    @IsString()
    @MinLength(6)
    @MaxLength(150)
    username:string;

    @ApiProperty({
        name:'password',
        type:'string',
        description: 'User password'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(150)
    password:string;

}