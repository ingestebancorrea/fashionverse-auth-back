import { Module } from '@nestjs/common';
import { AuthenticationMethodsService } from './authentication_methods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMethod } from './entities/authentication_method.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationMethod])
  ],
  providers: [AuthenticationMethodsService],
  exports: [AuthenticationMethodsService]
})
export class AuthenticationMethodsModule {}
