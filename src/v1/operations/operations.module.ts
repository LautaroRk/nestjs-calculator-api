import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';
import { User } from 'src/v1/users/user.entity';
import { Record } from 'src/v1/records/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operation, User, Record])],
  controllers: [OperationsController],
  providers: [OperationsService]
})
export class OperationsModule {}
