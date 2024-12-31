import { ApiProperty } from "@nestjs/swagger";

export class UsersDto{
    @ApiProperty({description: "Username as predefined", example: "emma"})
    username: string;
    @ApiProperty({description: "Password as predefined", example: "123456"})
    password: string;
}