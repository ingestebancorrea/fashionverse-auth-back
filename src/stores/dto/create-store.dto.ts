import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateStoreDto {

    @ApiProperty({
        type: String,
        description: 'This is the store name',
    })
    @MinLength(5)
    @MaxLength(50)
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'This is the cellphone',
    })
    @MaxLength(10)
    @IsString()
    cellphone: string;
    
    @ApiProperty({
        type: Number,
        description: 'This is the store type',
    })
    @IsNumber()
    id_storetype: number;

    @ApiProperty({
        type: Number,
        description: 'This is the department id',
    })
    @IsNumber()
    id_department: number;

    @ApiProperty({
        type: Number,
        description: 'This is the city id',
    })
    @IsNumber()
    id_city: number;

    @ApiProperty({
        type: String,
        description: 'This is the neighborhood name',
    })
    @MinLength(5)
    @MaxLength(50)
    @IsString()
    neighborhood: string;

    @ApiProperty({
        type: String,
        description: 'This is the street name',
    })
    @MinLength(5)
    @MaxLength(50)
    @IsString()
    street: string;

    @ApiProperty({
        type: String,
        description: 'This is the street number',
    })
    @MinLength(3)
    @MaxLength(10)
    @IsString()
    house_number: string;

    @ApiProperty({
        type: String,
        description: 'This is other references',
    })
    @MinLength(5)
    @MaxLength(50)
    @IsString()
    @IsOptional()
    other_references: string;

}
