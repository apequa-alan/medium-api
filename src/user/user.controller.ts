import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponse } from '@app/user/types';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { User } from '@app/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponse> {
    return await this.userService.login(loginUserDto);
  }

  @Get('user')
  async currentUser(
    @User() user: UserEntity,
    @User('id') id: number,
  ): Promise<UserResponse> {
    console.log(user, id);
    return this.userService.buildUserResponse(user);
  }
}
