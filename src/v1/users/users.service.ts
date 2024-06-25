import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserStatus } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      balance: 100,
    });
    return this.usersRepository.save(user);
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {username: user.username, sub: user.id};
      const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
      return { accessToken };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }
}
