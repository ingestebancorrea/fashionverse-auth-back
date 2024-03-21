import { Controller, Get, Param } from '@nestjs/common';
import { DocumenttypesService } from './documenttypes.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';

@ApiTags('Document Type')
@Controller('documenttypes')
export class DocumenttypesController {
  constructor(private readonly documenttypesService: DocumenttypesService) {}

  @ApiResponse({status:200, description: SuccessMessages.SUCCESS_RETURN})
  @ApiResponse({status:404, description: ErrorMessages.RESOURCE_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get()
  async findAll() {
    return await this.documenttypesService.findAll();
  }

  @ApiResponse({status:404, description: ErrorMessages.RESOURCE_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documenttypesService.findOne(+id);
  }

}
