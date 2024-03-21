import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    AuthModule,
    UserModule,
    AddressesModule,
  ],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
