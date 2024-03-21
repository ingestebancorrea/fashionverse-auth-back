import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/user/user.service';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class StoresService {

  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    private readonly userService: UsersService,
    private readonly addressService:AddressesService
  ) { }
  
  async create(token:string, createStoreDto: CreateStoreDto) {
    const store = await this.findByName(createStoreDto.name);
    const { name, cellphone, id_storetype, ...address } = createStoreDto;
    if (store) throw new ConflictException(ErrorMessages.STORE_CONFLICT);

    try {
      // Step 1
      const savedAddress = await this.addressService.create(address);

      // Step 2
      const newStore = new Store();
      const uuid = await this.userService.extractIdUserOfToken(token);
      newStore.name = name;
      newStore.cellphone = cellphone;
      newStore.is_active = true;
      newStore.id_storetype = id_storetype;
      newStore.user_uuid = uuid;
      newStore.id_address = savedAddress.id;
      await this.storeRepository.save(newStore);

      return {
        statusCode: 201,
        message: SuccessMessages.STORE_REGISTERED
      }
    } catch (error) {
      console.log("Error:", error);
      throw new InternalServerErrorException(ErrorMessages.APPLICATION_ERROR);
    }
  }

  async findByName(name: string) {
    return await this.storeRepository.findOne({
      where: {
        name
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

}
