import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@ApiTags("Home Page")
  @Get()
  @ApiOperation({summary: "Does nothing, just a landing page"})
  @ApiResponse({
    status: 200,
    description: "Just a welcome page"
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
