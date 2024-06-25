import { Controller, UseGuards } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { Post, Body, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/v1/users/jwt-auth.guard';
import { User } from 'src/v1/users/user.entity';

@Controller({ path: 'operations', version: '1' })
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async performOperation(@Body() createOperationDto: CreateOperationDto, @Request() req: { user: User }) {
    return this.operationsService.performOperation(createOperationDto, req.user);
  }
}
