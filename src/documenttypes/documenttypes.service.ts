import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documenttype } from './entities/documenttype.entity';

@Injectable()
export class DocumenttypesService {

  constructor(
    @InjectRepository(Documenttype) 
    private documentTypeRepository: Repository<Documenttype>
  ){}

  async findAll() {
    return await this.documentTypeRepository.find({
      select: {
        id: true,
        name: true,
        alias: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} documenttype`;
  }

}
