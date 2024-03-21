import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';

@Injectable()
export class AddressesService {

  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) { }
  
  async create(createAddressDto: CreateAddressDto) {
    try{
      const address = this.addressRepository.create(createAddressDto);
      return await this.addressRepository.save(address);
    }catch(error){
      console.log("Error:",error);
      throw new InternalServerErrorException(ErrorMessages.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
