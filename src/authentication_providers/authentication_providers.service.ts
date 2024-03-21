import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationProvider } from './entities/authentication_provider.entity';

@Injectable()
export class AuthenticationProvidersService {
  constructor(
    @InjectRepository(AuthenticationProvider)
    private readonly authenticationProviderRepository:Repository<AuthenticationProvider>
  ) { }


  async findByAlias(alias: string) {
    const authenticationProvider: AuthenticationProvider = await this.authenticationProviderRepository.findOne({ where: { alias } });
    return authenticationProvider;
  }
}
