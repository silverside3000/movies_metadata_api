import { Test, TestingModule } from "@nestjs/testing"
import { VideoController } from "./video.controller"
import { VideoService } from "./video.service"
import { UsersService } from "../users/users.service"
import { CreateVideoDto } from "./dto/create-video.dto"


describe('VideoController', () =>{
    let controller: VideoController

    const mockVideoService = {
        create: jest.fn(CreateVideoDto => {
            return{id:Date.now(), ...CreateVideoDto}
        }),
        update: jest.fn().mockImplementation((id, CreateVideoDto) =>({
            id, ...CreateVideoDto
        }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VideoController],
            providers: [VideoService]
        }).overrideGuard(UsersService).useValue(mockVideoService)
        .overrideProvider(UsersService).useValue(mockVideoService)
        .compile()
        controller = module.get<VideoController>(VideoController)
    })

    it('Should be defined', () => {
        expect(controller).toBeDefined()
    })
    it('Should create a new movie', () => {
        expect(controller.create({ title: "Power rangers", duration: "45m",
                                description: "Ridiculus", tags: "Action", genre: "Comedy/Cringe/Action" }))
                        .toEqual({id:expect.any(Number), title: "Power rangers", duration: "45m",
                                description: "Ridiculus", tags: "Action", genre: "Comedy/Cringe/Action"})
    })

    expect(mockVideoService.create).toHaveBeenCalledWith({ title: "Power rangers", duration: "45m",
                                description: "Ridiculus", tags: "Action", genre: "Comedy/Cringe/Action" })
    
    it('Should Update a movie metatdata', () => {
        const dto = {title: "Power rangers", duration: "45m",
                    description: "Ridiculus", tags: "Action", genre: "Comedy/Cringe/Action"}
        expect (controller.update(1, dto)).toEqual({id: 1, ...dto})
    })
    expect(mockVideoService.update).toHaveBeenCalled()
})
