import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { federationObjects } from './services/factory/FedarationObjects';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/common/enum/error-messages.enum';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @ApiResponse({status:201, description: 'Success SingUp'})
  @ApiResponse({status:400, description: ErrorMessages.BAD_LOGIN_INSTANCE})
  @ApiResponse({status:404, description: ErrorMessages.ROLE_NOT_FOUND})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('services/register')
  createUserWithServices( @Body('') registerUserDto:RegisterUserDto ){
    return this.authService.createUserWithServices(registerUserDto.token,federationObjects[registerUserDto.loginprovider],registerUserDto.alias_role); 
  }

  @ApiResponse({status:201, description: 'Success SingUp'})
  @ApiResponse({status:400, description: ErrorMessages.BAD_LOGIN_INSTANCE})
  @ApiResponse({status:404, description: ErrorMessages.ROLE_NOT_FOUND})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('credentials/register')
  createUserWithCredentials( @Body('token') token: string ){
    return this.authService.createUserWithCredentials(); 
  }

  @ApiResponse({status:400, description: ErrorMessages.BAD_LOGIN_INSTANCE})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:404, description: ErrorMessages.USER_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('services/login')
  loginWithServices( @Body('') loginDto:LoginDto ){
    return this.authService.loginWithServices(loginDto.token,federationObjects[loginDto.loginprovider]); 
  }

  @ApiResponse({status:400, description: ErrorMessages.BAD_LOGIN_INSTANCE})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:404, description: ErrorMessages.USER_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('credentials/login')
  loginWithCredentials( @Body('token') token: string){
    return this.authService.loginWithCredentials(); 
  }

  @ApiResponse({status:400, description: ErrorMessages.BAD_LOGIN_INSTANCE})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:404, description: ErrorMessages.USER_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('logout')
  logout( @Body('token') token: string ){
    return {
      message: 'ok'
    }; 
  }


}
