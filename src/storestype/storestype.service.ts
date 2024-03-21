import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storestype } from './entities/storestype.entity';

@Injectable()
export class StorestypeService {
  
  constructor(
    @InjectRepository(Storestype) 
    private storesTypeRepository: Repository<Storestype>
  ){}

  async findAll() {
    return await this.storesTypeRepository.find({
      select: {
        id: true,
        name: true,
        alias: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} storestype`;
  }

}
