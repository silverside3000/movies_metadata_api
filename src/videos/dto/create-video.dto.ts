import { ApiProperty } from "@nestjs/swagger";

export class CreateVideoDto{
    @ApiProperty({description: "Title of the movie"})
    title: string;
    @ApiProperty({description: "Movie duration"})
    duration: string
    @ApiProperty({description: "Movie description"})
    description: string;
    @ApiProperty({description: "movie tags"})
    tags: string;
    @ApiProperty({description: "Movie genre"})
    genre: string;
}