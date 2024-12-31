import { AuthController } from "./auth.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";


describe('AuthController', () =>{
    let controller: AuthController

    const mockUserSer = {

    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService]
        }).overrideProvider(AuthService).useValue(mockUserSer).compile()
        controller = module.get<AuthController>(AuthController)
    })

    it('Should be defined', () => {
        expect(controller).toBeDefined()
    })

} )