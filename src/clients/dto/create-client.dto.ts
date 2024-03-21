import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateClientDto {
    
    @ApiProperty({
        type: String,
        description: 'This is the name',
    })
    @MinLength(5)
    @MaxLength(50)
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'This is the lastname',
    })
    @MinLength(5)
    @MaxLength(50)
    @IsString()
    lastname: string;

    @ApiProperty({
        type: Number,
        description: 'This is the document type id',
    })
    @IsNumber()
    id_documenttype: number;

    @ApiProperty({
        type: String,
        description: 'This is the document number',
    })
    @IsString()
    identification_number: string;

    @ApiProperty({
        type: Date,
        description: 'This is the birth date',
    })
    @IsDate()
    @Type(() => Date)
    birth_date: Date;

}
