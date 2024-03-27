import { Module } from '@nestjs/common';
import { ClientpreferencesService } from './clientpreferences.service';
import { ClientpreferencesController } from './clientpreferences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientpreference } from './entities/clientpreference.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from 'src/clients/clients.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clientpreference]),
    AuthModule,
    UserModule,
    ClientsModule,
  ],
  controllers: [ClientpreferencesController],
  providers: [ClientpreferencesService]
})
export class ClientpreferencesModule {}
