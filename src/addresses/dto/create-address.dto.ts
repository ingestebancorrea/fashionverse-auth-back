import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAddressDto {

    @ApiProperty({
        type: Number,
        description: 'This is city id',
    })
    @IsNumber()
    id_city: number;

    @ApiProperty({
        type: Number,
        description: 'This is department id',
    })
    @IsNumber()
    id_department: number;

    @ApiProperty({
        type: String,
        description: 'This is the street name',
    })
    @MaxLength(50)
    @IsString()
    street: string;

    @ApiProperty({
        type: String,
        description: 'This is the house number',
    })
    @MinLength(3)
    @MaxLength(10)
    @IsString()
    house_number: string;

    @ApiProperty({
        type: String,
        description: 'This is the neighborhood name',
    })
    @MaxLength(50)
    @IsString()
    @IsOptional()
    neighborhood: string;

    
}
