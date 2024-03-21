import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessMessages } from 'src/common/enums/sucess-message.enum';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';

@ApiTags('City')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiResponse({status:200, description: SuccessMessages.SUCCESS_RETURN})
  @ApiResponse({status:404, description: ErrorMessages.RESOURCE_NOT_FOUND})
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get('department/:id')
  async findAllByIdDepartment(@Param('id') idDepartment:string) {
    return await this.citiesService.findAllByIdDepartment(+idDepartment);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }

}
