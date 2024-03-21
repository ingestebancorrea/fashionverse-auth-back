import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { UsersService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreatorFactory } from './services/factory/CreatorFactory';
import { User } from 'src/user/entities/user.entity';
import { UserToReturnDto } from './dto/return-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserWithCredentialsDto } from './dto/register-user-with-credentials.dto';
import { LoginWithCredentialsDto } from './dto/login-with-credentials.dto';
import { AuthenticationMethodsService } from 'src/authentication_methods/authentication_methods.service';
import { AuthenticationProvidersService } from 'src/authentication_providers/authentication_providers.service';
import { objectBDFederations, objectCredentials } from './services/federation/federationObjects';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Role) private rolRepository: Repository<Role>,
    private readonly authenticationMethodService: AuthenticationMethodsService,
    private readonly authenticationProvider: AuthenticationProvidersService,
  ) { }

  async createUserWithServices(token: string, creatorFactory: CreatorFactory, aliasRole: string,loginProvider: string) {
    const payload = await creatorFactory.checkToken(token);//CreateAzureFederation instead of creatorFactory

    if (!payload) {
      throw new BadRequestException(ErrorMessages.NOT_VALID_TOKEN)
    }

    let user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      const role = await this.rolRepository.findOne({ where: { alias: aliasRole } });

      const createUserDto: CreateUserDto = {
        username: payload.email,
        password: null,
        full_name: payload.full_name,
        image_url: payload.picture,
        sub: payload.sub,
        id_role: role.id,
        is_active: true,
        auth_method_id: (await this.authenticationMethodService.findByAlias(objectBDFederations[loginProvider].authenticationmethod)).id,
        auth_provider_id: (await this.authenticationProvider.findByAlias(objectBDFederations[loginProvider].authenticationprovider)).id
      }
      user = await this.usersService.store(createUserDto);
    } else {
      throw new ConflictException(`User ${payload.email} already is registered`);
    }
    const access_token = this.jwtService.sign({ username: payload.email }, { secret: process.env.JWT_SECRET })
    const objUser = await this.mapUser(user);
    return { ...objUser, access_token }
  }

  async createUserWithCredentials(registerUserWithCredentialsDto: RegisterUserWithCredentialsDto) {
    let newUser:User;
    const user = await this.usersService.findByEmail(registerUserWithCredentialsDto.username);

    if (!user) {
      const role: Role = await this.rolRepository.findOne({ where: { alias: registerUserWithCredentialsDto.alias_role } });
  
      const createUserDto: CreateUserDto = {
        username: registerUserWithCredentialsDto.username,
        password: bcrypt.hashSync(registerUserWithCredentialsDto.password, 10),
        full_name: `${registerUserWithCredentialsDto.name} ${registerUserWithCredentialsDto.lastname}`,
        image_url: null,
        sub: null,
        is_active: true,
        id_role: role.id,
        auth_method_id: (await this.authenticationMethodService.findByAlias(objectCredentials["normalTokenValidation"].authenticationmethod)).id,
        auth_provider_id: (await this.authenticationProvider.findByAlias(objectCredentials["normalTokenValidation"].authenticationprovider)).id
      }
      console.log('createUser:',createUserDto);
      newUser = await this.usersService.store(createUserDto);
    }

    const userToReturn = await this.mapUser(user ? user : newUser);
    const access_token = await this.generateAccesToken(userToReturn);
    return { ...userToReturn, access_token }
  }

  async loginWithServices(token: string, creatorFactory: CreatorFactory) {
    const payload = await creatorFactory.checkToken(token);
    if (!payload) {
      throw new BadRequestException(ErrorMessages.NOT_VALID_TOKEN)
    }

    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new NotFoundException(`User ${payload.email} not found`);
    }

    const userToReturn = await this.mapUser(user);
    const access_token = await this.generateAccesToken(userToReturn);
    return { ...userToReturn, access_token }
  }

  async loginWithCredentials(loginWithCredentialsUserDto: LoginWithCredentialsDto) {
    const { username, password } = loginWithCredentialsUserDto;
    const user = await this.usersService.findByEmail(username);

    if (!user)
      throw new UnauthorizedException(ErrorMessages.WRONG_USERNAME_PASSWORD);
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(ErrorMessages.WRONG_USERNAME_PASSWORD);

    const userToReturn = await this.mapUser(user);
    const access_token = await this.generateAccesToken(userToReturn);
    return { ...userToReturn, access_token }
  }

  async generateAccesToken(user: any) {
    return await this.jwtService.signAsync(
      {
        uuid: user.uuid,
        username: user.email,
        name: user.displayName,
        activerole: user.role.alias
      }, {
      secret: process.env.JWT_SECRET,
      expiresIn: '60m'
    }
    );
  }

  mapUser = async (user: User): Promise<UserToReturnDto> => {
    const role = await this.rolRepository.findOne({ where: { id: user.id_role } });
    const userToReturn: UserToReturnDto =
    {
      id: user.id,
      uuid: user.user_uuid,
      email: user.username,
      displayName: user.full_name,
      photoURL: user.image_url || null,
      role: {
        id: role.id,
        name: role.name,
        alias: role.alias,
        is_active: role.is_active
      } || {}
    }
    return userToReturn;
  }

}