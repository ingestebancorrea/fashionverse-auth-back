import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department) 
    private departmentRepository: Repository<Department>
  ){}
  
  async findAll() {
    return await this.departmentRepository.find({
      select: {
        id: true,
        name: true,
        alias: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

}
