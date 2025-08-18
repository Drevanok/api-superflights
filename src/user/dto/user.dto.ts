import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 8)
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(6, 12)
    readonly password: string;
}