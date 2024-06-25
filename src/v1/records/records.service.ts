import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { Repository } from 'typeorm';
import { User } from 'src/v1/users/user.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async getRecordById(recordId: number) {
    return this.recordsRepository.findOne({ 
      where: { id: recordId },
    });
  }

  async deleteRecord(recordId: number, user: User) {
    const record = await this.getRecordById(recordId);

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    if (record.user_id !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    record.deleted = true;
    return this.recordsRepository.save(record);
  }
}
