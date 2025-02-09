import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
    
    // @IsString()
    // file: any;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}