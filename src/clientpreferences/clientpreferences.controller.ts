import { Controller, Get, Post, Body, Param, UseGuards, Headers } from '@nestjs/common';
import { ClientpreferencesService } from './clientpreferences.service';
import { CreateClientpreferenceDto } from './dto/create-clientpreference.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesDec } from 'src/auth/role/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/common/enums/roles.enum';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';

@ApiTags('Client Preference')
@ApiBearerAuth('access-token')
@Controller('clientpreferences')
export class ClientpreferencesController {
  constructor(private readonly clientpreferencesService: ClientpreferencesService) {}

  @ApiResponse({status:201, description: SuccessMessages.PREFERENCES_REGISTERED,type: [CreateClientpreferenceDto]})
  @ApiResponse({status:400, description: ErrorMessages.BAD_REQUEST})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @RolesDec(Roles.CLIENT)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Headers('Authorization') request: any, @Body() createClientpreferenceDto: CreateClientpreferenceDto[]) {
    const jwt = request.replace('Bearer ', '');
    return await this.clientpreferencesService.create(jwt,createClientpreferenceDto);
  }

  @Get()
  findAll() {
    return this.clientpreferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientpreferencesService.findOne(+id);
  }

}
