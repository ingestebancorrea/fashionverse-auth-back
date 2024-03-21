import { Module } from '@nestjs/common';
import { AuthenticationProvidersService } from './authentication_providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationProvider } from './entities/authentication_provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationProvider])
  ],
  providers: [AuthenticationProvidersService],
  exports: [AuthenticationProvidersService]
})
export class AuthenticationProvidersModule {}
