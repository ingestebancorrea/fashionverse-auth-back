import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateClientpreferenceDto {
    
    id_client?: number;

    @ApiProperty({
        type: Number,
        description: 'This is the preference id',
    })
    @IsNumber()
    id_preference: number;
    
}
