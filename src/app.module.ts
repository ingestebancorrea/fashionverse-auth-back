import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { DocumenttypesModule } from './documenttypes/documenttypes.module';
import { StoresModule } from './stores/stores.module';
import { StorestypeModule } from './storestype/storestype.module';
import { DepartmentsModule } from './departments/departments.module';
import { CitiesModule } from './cities/cities.module';
import { AddressesModule } from './addresses/addresses.module';
import { AuthenticationProvidersModule } from './authentication_providers/authentication_providers.module';
import { AuthenticationMethodsModule } from './authentication_methods/authentication_methods.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ User ],
      subscribers: [  ],
      ssl: true,
      autoLoadEntities: true,
      synchronize: false
    }),
    AuthModule, 
    UserModule, 
    ClientsModule, 
    DocumenttypesModule, StoresModule, StorestypeModule, DepartmentsModule, CitiesModule, AddressesModule, AuthenticationProvidersModule, AuthenticationMethodsModule, 
  ]
})
export class AppModule {}
