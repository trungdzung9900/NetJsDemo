import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentailDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:"The first letter must be upperCase and password must have number"})
    password: string;
}