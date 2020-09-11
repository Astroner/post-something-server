import { IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    subTitle?: string

    @IsString()
    text: string
}