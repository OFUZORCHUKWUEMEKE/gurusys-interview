import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    url?: File
}

export class UpdateBlogDto {
    @IsString()
    title?: string;

    @IsString()
    content?: string;
}
