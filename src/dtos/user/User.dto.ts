import { Exclude, Expose, Transform, Type } from 'class-transformer';
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
    @Expose()
    @Transform(({ value }) => value.toString())
    _id: any;
    
    @Expose()
    firstName: string;
    
    @Expose()
    lastName: string;
    
    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose()
    dob: Date;

    @Expose()
    address: string;

    @Expose()
    contactNo: string;
    
    @Exclude()
    __v:number

    constructor(partial: Partial<userListResponse>) {
        Object.assign(this, partial);
    }
}