import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from 'src/v1/users/jwt-auth.guard';
import { User } from 'src/v1/users/user.entity';

@Controller({ path: 'records', version: '1' })
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':recordId')
  async deleteRecord(@Request() req: { user: User }, @Param('recordId') recordId: string) {
    return this.recordsService.deleteRecord(parseInt(recordId), req.user);
  }
}
