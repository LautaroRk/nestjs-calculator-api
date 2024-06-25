import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

interface UserRequest {
  user: {
    id: number,
    username: string,
  }
}

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    console.log(username, password);
    return this.usersService.createUser(username, password)
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.usersService.login(username, password)
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req: UserRequest) {
    return req.user;
  }
}
