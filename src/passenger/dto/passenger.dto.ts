import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class PassengerDTO {
    @IsNotEmpty()
    @IsString()
    readonly name : string;
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    @IsEmail()
    readonly email : number;
}