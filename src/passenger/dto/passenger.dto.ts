import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class PassengerDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name : string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    @IsEmail()
    readonly email : number;
}