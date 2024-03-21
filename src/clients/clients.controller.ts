import { Controller, Get, Post, Body, Patch, Param, Headers, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { RolesDec } from 'src/auth/role/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/common/enums/roles.enum';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';

@ApiTags('Client')
@ApiBearerAuth('access-token')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiResponse({status:201, description: SuccessMessages.CLIENT_REGISTERED})
  @ApiResponse({status:400, description: ErrorMessages.BAD_REQUEST})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:409, description: ErrorMessages.CLIENT_CONFLICT})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @RolesDec(Roles.CLIENT)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Headers('Authorization') request: any, @Body() createClientDto: CreateClientDto) {
    const jwt = request.replace('Bearer ', '');
    return await this.clientsService.create(jwt,createClientDto);
  }

  
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @UseGuards(RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

}
