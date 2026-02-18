import { Controller, Get, Param } from '@nestjs/common';
import { ScalesService } from './scales.service';

@Controller('scales')
export class ScalesController {
  constructor(private readonly scalesService: ScalesService) {}

  @Get()
  findAll() {
    return this.scalesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.scalesService.findById(id);
  }
}
