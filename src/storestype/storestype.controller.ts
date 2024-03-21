import { Controller, Get, Param } from '@nestjs/common';
import { StorestypeService } from './storestype.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';

@ApiTags('Stores Type')
@Controller('storestype')
export class StorestypeController {
  constructor(private readonly storestypeService: StorestypeService) {}

  @ApiResponse({status:200, description: SuccessMessages.SUCCESS_RETURN})
  @ApiResponse({status:404, description: ErrorMessages.RESOURCE_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get()
  async findAll() {
    return await this.storestypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storestypeService.findOne(+id);
  }

}
