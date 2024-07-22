import {IsString,IsEnum, IsDate, IsEmail, IsOptional, isNotEmpty, IsNotEmpty} from 'class-validator'

export class AuthDto {
    @IsString()  
    @IsNotEmpty()
    identity: string;

    @IsString()    
    password: string;
}