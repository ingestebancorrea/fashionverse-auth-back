import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClientpreferenceDto } from './dto/create-clientpreference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clientpreference } from './entities/clientpreference.entity';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { UsersService } from 'src/user/user.service';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ClientpreferencesService {

  constructor(
    @InjectRepository(Clientpreference)
    private clientPreferenceRepository: Repository<Clientpreference>,
    private readonly userService: UsersService,
    private readonly clientService: ClientsService,
  ) { }

  async create(token: string, createClientpreferenceDto: CreateClientpreferenceDto[]) {
    const userUuid = await this.userService.extractIdUserOfToken(token);
    
    if (!userUuid) {
      throw new NotFoundException('User not found');
    }

    try {
      const client = await this.clientService.findByUserUUID(userUuid);
      const idClient = client.id;

      for (const preference of createClientpreferenceDto) {
        preference.id_client = idClient;
        const clientPreference = this.clientPreferenceRepository.create(preference);
        await this.clientPreferenceRepository.save(clientPreference);
      }

      return {
        statusCode: 201,
        message: SuccessMessages.PREFERENCES_REGISTERED
      };
    } catch (error) {
      console.log('Error:', error);
      throw new InternalServerErrorException(ErrorMessages.DEFAULT_REQUEST_EXCEPTION);
    }
  }


  findAll() {
    return `This action returns all clientpreferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientpreference`;
  }

}
