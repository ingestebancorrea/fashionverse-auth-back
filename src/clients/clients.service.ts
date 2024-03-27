import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { UsersService } from 'src/user/user.service';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private readonly userService: UsersService,
  ) { }

  async create(token: string, createClientDto: CreateClientDto) {
    const client = await this.findByIdentification(createClientDto.identification_number);

    if (client) throw new ConflictException(ErrorMessages.CLIENT_CONFLICT);

    try {
      const newClient = this.clientRepository.create(createClientDto);
      const uuid = await this.userService.extractIdUserOfToken(token);
      newClient.user_uuid = uuid;
      await this.clientRepository.save(newClient);

      return {
        statusCode: 201,
        message: SuccessMessages.CLIENT_REGISTERED
      }
    } catch (error) {
      console.log("Error:", error);
      throw new InternalServerErrorException(ErrorMessages.APPLICATION_ERROR);
    }
  }

  async findByIdentification(document: string) {
    return await this.clientRepository.findOne({
      where: {
        identification_number: document
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async findByUserUUID(uuid: string){
    return await this.clientRepository.findOne({
      where: {
        user_uuid: uuid
      },
      select: {
        id: true
      }
    });
  }
}
