import { Module } from '@nestjs/common';
import { UsersModule } from './v1/users/users.module';
import { OperationsModule } from './v1/operations/operations.module';
import { RecordsModule } from './v1/records/records.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    UsersModule,
    OperationsModule,
    RecordsModule,
  ],
})
export class AppModule {}
