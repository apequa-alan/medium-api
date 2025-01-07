import { compare } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { JWT_SECRET } from '@app/config';
import { UserResponse } from '@app/user/types';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}
  async createUser(payload: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userEntityRepository.findOne({
      where: { email: payload.email },
    });
    const userByUsername = await this.userEntityRepository.findOne({
      where: { username: payload.username },
    });
    console.log(userByEmail, userByUsername);
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username is already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const user = new UserEntity();
    Object.assign(user, payload);
    return await this.userEntityRepository.save(user);
  }

  generateJwt(user: UserEntity) {
    return sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
    );
  }
  buildUserResponse(user: UserEntity): UserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  findUserById(id: number): Promise<UserEntity> {
    return this.userEntityRepository.findOne({ where: { id } });
  }
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    Object.assign(user, updateUserDto);
    return this.userEntityRepository.save(user);
  }

  async login(payload: LoginUserDto) {
    const userByEmail = await this.userEntityRepository.findOne({
      where: { email: payload.email },
      select: ['password', 'email', 'id', 'username', 'bio', 'image'],
    });
    if (!userByEmail) {
      throw new HttpException('User is not exist', HttpStatus.BAD_REQUEST);
    }
    const passwordIsCorrect = compare(payload.password, userByEmail.password);

    if (!passwordIsCorrect) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete userByEmail.password;
    return this.buildUserResponse(userByEmail);
  }
}
