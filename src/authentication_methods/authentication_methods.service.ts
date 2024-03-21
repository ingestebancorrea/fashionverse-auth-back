import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationMethod } from './entities/authentication_method.entity';

@Injectable()
export class AuthenticationMethodsService {
  constructor(
    @InjectRepository(AuthenticationMethod)
    private readonly authenticationMethodRepository:Repository<AuthenticationMethod>
  ) { }


  async findByAlias(alias: string) {
    const authenticationMethod: AuthenticationMethod = await this.authenticationMethodRepository.findOne({ where: { alias } });
    return authenticationMethod;
  }
}
