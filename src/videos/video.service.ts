import { Body, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "./video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { AuthGuard } from "../auth/guards/auth.guards";

@Injectable()
export class VideoService{    
    constructor(@InjectRepository(Video) private readonly videoRepository: Repository<Video>){}

    async create(dto: CreateVideoDto){
        const vid = this.videoRepository.create(dto)
        return await this.videoRepository.save(vid)
    }

    async update(id: number, dto: CreateVideoDto){
        const vid = await this.videoRepository.findOne({where:{id}})
        Object.assign(vid, dto)
        await this.videoRepository.save(vid)
        return vid;
    }
    @UseGuards(AuthGuard)
    async findAll() {
        const vid = await this.videoRepository.find();
        if(!vid || vid.length == 0)
            throw new NotFoundException("No Videos found")
        if(vid.length > 10)// in the event that the record exceeds 10
            return this.findAllPaginated(2)
        return vid;
    }
    async findAllPaginated(take: number = 10, skip: number = 0) {
        const [data, total] = await this.videoRepository.findAndCount({ take, skip });
        return { data, total };
    }
    
    async findOne(id: number) {
        const vid = await this.videoRepository.findOneBy({id: id })
        if(!vid)
            throw new NotFoundException(`No Videos with #${id} found`)
        return vid;
    }

    async findGenre(id: string) {
        const vid = await this.videoRepository.query("SELECT * FROM VIDEO WHERE genre like '%" + id + "%'")
        if(!vid || vid.length == 0)
            throw new NotFoundException(`No Video(s) with genre ${id} found`)
        return vid;
    }

    async findTags(id: string) {
        const vid = await this.videoRepository.query("SELECT * FROM VIDEO WHERE tags like '%" + id + "%'")
        if(!vid || vid.length == 0)
            throw new NotFoundException(`No Video(s) with tag(s) ${id} found`)
        return vid;
    }

    async findTitle(id: string) {
        const vid = await this.videoRepository.query("SELECT * FROM VIDEO WHERE title like '%" + id + "%'")
        if(!vid || vid.length == 0)
            throw new NotFoundException(`No Video(s) with title(s) ${id} found`)
        return vid;
    }

    async remove(id: number) {
        const vid = await this.videoRepository.findOne({where: {id: 1} });
        return await this.videoRepository.delete(vid);
    }
}