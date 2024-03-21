import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { federationObjects } from './services/factory/FedarationObjects';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { RegisterUserWithProviderDto } from './dto/register-user-with-provider.dto';
import { LoginWithProviderDto } from './dto/login-with-provider.dto';
import { RegisterUserWithCredentialsDto } from './dto/register-user-with-credentials.dto';
import { LoginWithCredentialsDto } from './dto/login-with-credentials.dto';
import { UserSchema } from './schema/user.schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @ApiResponse({status:201, description: 'Success SingUp', schema: { type: 'object', example: UserSchema }})
  @ApiResponse({status:400, description: ErrorMessages.BAD_REQUEST})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('services/register')
  createUserWithServices( @Body('') registerUserWithProviderDto:RegisterUserWithProviderDto ){
    return this.authService.createUserWithServices(registerUserWithProviderDto.token,federationObjects[registerUserWithProviderDto.loginprovider],registerUserWithProviderDto.alias_role,registerUserWithProviderDto.loginprovider); 
  }

  @ApiResponse({status:201, description: 'Success SingUp', schema: { type: 'object', example: UserSchema }})
  @ApiResponse({status:400, description: ErrorMessages.BAD_REQUEST})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('credentials/register')
  createUserWithCredentials( @Body('') registerUserWithCredentialsDto:RegisterUserWithCredentialsDto ){
    return this.authService.createUserWithCredentials(registerUserWithCredentialsDto); 
  }

  @ApiResponse({status:400, description: ErrorMessages.BAD_LOGIN_INSTANCE})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:404, description: ErrorMessages.USER_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('services/login')
  loginWithServices( @Body('') loginWithProviderDto:LoginWithProviderDto ){
    return this.authService.loginWithServices(loginWithProviderDto.token,federationObjects[loginWithProviderDto.loginprovider]); 
  }

  @ApiResponse({status:400, description: ErrorMessages.BAD_REQUEST})
  @ApiResponse({status:404, description: ErrorMessages.USER_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Post('credentials/login')
  loginWithCredentials( @Body('') loginWithCredentialsUserDto:LoginWithCredentialsDto){
    return this.authService.loginWithCredentials(loginWithCredentialsUserDto); 
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
