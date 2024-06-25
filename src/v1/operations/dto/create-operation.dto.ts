import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { OperationType } from "../operation.entity";

export class CreateOperationDto {
  @IsNotEmpty()
  @IsEnum(OperationType)
  operationType: OperationType;

  @IsOptional()
  @IsNumber()
  amount1?: number;

  @IsOptional()
  @IsNumber()
  amount2?: number;
}