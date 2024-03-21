import { Controller, Get, Post, Body, Patch, Param, UseGuards, Headers } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { RoleGuard } from 'src/auth/role/role.guard';
import { RolesDec } from 'src/auth/role/roles.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';

@ApiTags('Store')
@ApiBearerAuth('access-token')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiResponse({status:201, description: SuccessMessages.STORE_REGISTERED })
  @ApiResponse({status:400, description: ErrorMessages.BAD_REQUEST})
  @ApiResponse({status:401, description: ErrorMessages.NOT_VALID_TOKEN})
  @ApiResponse({status:409, description: ErrorMessages.CLIENT_CONFLICT})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @RolesDec(Roles.STORE)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Headers('Authorization') request: any, @Body() createStoreDto: CreateStoreDto) {
    const jwt = request.replace('Bearer ', '');
    return await this.storesService.create(jwt,createStoreDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

}
