import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Videos metadata")
@Controller('videos')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({summary: "Creates a new video metadata"})
    @ApiCreatedResponse({description: "Video metatdata created successfully", type: CreateVideoDto})
    @ApiBadRequestResponse({description: "Invalid data provided"})
    create(@Body() videoDto: CreateVideoDto) {
      return this.videoService.create(videoDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    @ApiOperation({summary: "Fetches all the Video meta data info"})
    @ApiOkResponse({
      description: "List of all the available movies in the database",
      type: CreateVideoDto,
      isArray: true
    })
    @ApiNotFoundResponse({description: "No movies found"})
    findAll() {
      return this.videoService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('genre/:genre')
    @ApiOperation({summary: "Fetches a Video metadata info from the specified"})
    @ApiOkResponse({
      description: "List movie with specified genre database",
      type: CreateVideoDto,
      isArray: true
    })
    @ApiNotFoundResponse({description: "No movies found"})
    findGenre(@Param('genre') genre: string) {
      return this.videoService.findGenre(genre);
    }

    @UseGuards(AuthGuard)
    @Get('tags/:tags')
    @ApiOperation({summary: "Fetches a Video metadata info from tags specified"})
    @ApiOkResponse({
      description: "List movie with specified tags database",
      type: CreateVideoDto,
      isArray: true
    })
    @ApiNotFoundResponse({description: "No movies found"})
    findTags(@Param('tags') tags: string) {
      return this.videoService.findTags(tags);
    }

    @UseGuards(AuthGuard)
    @Get('title/:title')
    @ApiOperation({summary: "Fetches a Video metadata info from the specified"})
    @ApiOkResponse({
      description: "List movie with specified title database",
      type: CreateVideoDto,
      isArray: true
    })
    @ApiNotFoundResponse({description: "No movies found"})
    findTitle(@Param('title') title: string) {
      return this.videoService.findTitle(title);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOperation({summary: "Fetches a Video metadata info from the specified"})
    @ApiOkResponse({
      description: "List movie with specified Id database",
      type: CreateVideoDto,
      isArray: true
    })
    @ApiNotFoundResponse({description: "No movies found"})
    findOne(@Param('id') id: number) {
      return this.videoService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiOperation({summary: "Updates a Video metadata info from the specified id"})
    @ApiOkResponse({
      description: "updates a movie with specified Id database",
      type: CreateVideoDto,
      isArray: true
    })
    @ApiNotFoundResponse({description: "No movies found"})
    update(@Param('id') id: number, @Body() vidDto: CreateVideoDto) {
      return this.videoService.update(+id, vidDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOperation({summary: "deletes a Video metadata info from the specified"})
    @ApiOkResponse({
      description: "deletes a movie with specified Id database",
      type: CreateVideoDto,
      isArray: true
    })
    @ApiNotFoundResponse({description: "No movies found"})
    remove(@Param('id') id: string) {
      return this.videoService.remove(+id);
    }
}
