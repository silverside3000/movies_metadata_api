import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersDto } from '../videos/dto/users.dto';


@ApiBearerAuth()
@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService){}

    @Post('Login')
    @HttpCode(HttpStatus.OK)    
    @ApiOperation({summary: "This is the login page, it has just 2 predefined users, you can log in using either one"})
    @ApiResponse({
        status: 200,
        description: "User1 details username: \"emma\" and password: \"123456\", <br />User2 details username: \"charlse\" and password: \"xavier\"",
        type: UsersDto
    })
    @ApiBadRequestResponse({description: "Invalid data provided"})
    //login(@Body() input: {username: string; password: string}){
    login(@Body() input: UsersDto){
        return this.authService.authenticate(input);
    }
}
