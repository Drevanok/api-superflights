import { IsNotEmpty, IsString, Length } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 8)
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 12)
    readonly password: string;
}