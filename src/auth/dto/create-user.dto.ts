import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

    @MinLength(5)
    @MaxLength(25)
    @IsEmail()
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    @MaxLength(150)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(6)
    @MaxLength(150)
    full_name: string;

    @IsString()
    @IsOptional()
    image_url:string

    @IsString()
    @IsOptional()
    sub:string

    @IsBoolean()
    is_active:boolean

    @IsNumber()
    auth_provider_id:number

    @IsNumber()
    auth_method_id:number


}