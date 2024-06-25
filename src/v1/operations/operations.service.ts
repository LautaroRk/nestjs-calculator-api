import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation, OperationType } from './operation.entity';
import { Repository } from 'typeorm';
import { User } from 'src/v1/users/user.entity';
import { Record } from 'src/v1/records/record.entity';
import { CreateOperationDto } from './dto/create-operation.dto';
import axios from 'axios';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationsRepository: Repository<Operation>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async performOperation(createOperationDto: CreateOperationDto, user: User): Promise<{ result: string, balance: number }> {
    const operation = await this.operationsRepository.findOne({ where: { type: createOperationDto.operationType } });
    
    if (user.balance < operation.cost) {
      throw new UnauthorizedException('Insufficient balance');
    }

    const twoValuesRequired = [OperationType.ADDITION, OperationType.SUBTRACTION, OperationType.MULTIPLICATION, OperationType.DIVISION];
    if (twoValuesRequired.includes(createOperationDto.operationType) && (createOperationDto.amount1 === undefined || createOperationDto.amount2 === undefined)) {
      throw new BadRequestException('Two values required');
    }
    
    let result: string;

    switch(operation.type) {
      case OperationType.ADDITION:
        result = (createOperationDto.amount1 + createOperationDto.amount2).toString();
        break;
      case OperationType.SUBTRACTION:
        result = (createOperationDto.amount1 - createOperationDto.amount2).toString();
        break;
      case OperationType.MULTIPLICATION:
        result = (createOperationDto.amount1 * createOperationDto.amount2).toString();
        break;
      case OperationType.DIVISION:
        result = (createOperationDto.amount1 / createOperationDto.amount2).toString();
        break;
      case OperationType.SQUARE_ROOT:
        result = Math.sqrt(createOperationDto.amount1).toString();
        break;
      case OperationType.RANDOM_STRING:
        result = await this.getRandomString();
        break;
      default:
        throw new BadRequestException('Invalid operation type');
    }

    user.balance -= operation.cost;
    await this.usersRepository.save(user);

    await this.recordsRepository.create({
      user,
      operation,
      amount: operation.cost,
      user_balance: user.balance,
      operation_response: result,
      date: new Date(),
    }).save();

    return { result, balance: user.balance };
  }

  async getRandomString(): Promise<string> {
    const { RANDOM_ORG_URL, RANDOM_ORG_API_KEY } = process.env;

    const reqBody = {
      "jsonrpc": "2.0",
      "method": "generateStrings",
      "params": {
          "apiKey": RANDOM_ORG_API_KEY,
          "n": 1,
          "length": 10,
          "characters": "abcdefghijklmnopqrstuvwxyz",
          "replacement": true
      },
      "id": 1
    };
    const response = await axios.post(RANDOM_ORG_URL, reqBody);
    const randomString = response.data.result.random.data[0];

    return randomString;
  }
}
