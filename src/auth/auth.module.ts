import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Role } from 'src/role/entities/role-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationProvidersModule } from 'src/authentication_providers/authentication_providers.module';
import { AuthenticationMethodsModule } from 'src/authentication_methods/authentication_methods.module';

@Module({
  imports: [
    UserModule,
    AuthenticationProvidersModule,
    AuthenticationMethodsModule,
    TypeOrmModule.forFeature([Role]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: 3600 
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}
