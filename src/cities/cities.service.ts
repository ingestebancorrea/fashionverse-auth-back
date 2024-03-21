import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {

  constructor(
    @InjectRepository(City) 
    private cityRepository: Repository<City>
  ){}

  async findAllByIdDepartment(idDepartment:number) {
    return await this.cityRepository.find({
      where: {
        department: {
          id: idDepartment
        }
      },
      select: {
        id: true,
        name: true,
        alias: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

}
