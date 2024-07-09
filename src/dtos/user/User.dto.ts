import { Exclude, Type } from 'class-transformer';
import {IsString,IsEnum, IsDate, IsEmail, IsOptional} from 'class-validator'
import { ObjectId } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';

export class UserCreateDto {
    @IsString()    
    firstName: string;

    @IsString()    
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsDate() 
    @Type(() => Date)
    dob: Date;

    @IsString()    
    address: string;

    @IsString()
    contactNo: string;
}


export class UserUpdateDto extends PartialType(UserCreateDto){
    @IsOptional()
    @IsString()
    password?: string;
}


export class userListResponse {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    @Exclude()
    password: string;
    dob: Date;
    address: string;
    contactNo: string;
}