import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';

@ApiTags('Department')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiResponse({status:200, description: SuccessMessages.SUCCESS_RETURN})
  @ApiResponse({status:404, description: ErrorMessages.RESOURCE_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get()
  async findAll() {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

}
