import { IsNotEmpty, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateSubjectDto {
    @IsNotEmpty({ message: 'Subject name is required' })
    @IsString({ message: 'Subject name must be a string' })
    @MinLength(2, { message: 'Subject name must be at least 2 characters' })
    @MaxLength(100, { message: 'Subject name must not exceed 100 characters' })
    name: string;

    @IsNotEmpty({ message: 'Subject code is required' })
    @IsString({ message: 'Subject code must be a string' })
    @MinLength(2, { message: 'Subject code must be at least 2 characters' })
    @MaxLength(20, { message: 'Subject code must not exceed 20 characters' })
    code: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    @MaxLength(500, { message: 'Description must not exceed 500 characters' })
    description?: string;
}
