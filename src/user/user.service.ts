import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { JWT_SECRET } from '@app/config';
import { UserResponse } from "@app/user/types";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}
  async createUser(payload: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    Object.assign(user, payload);
    return await this.userEntity.save(user);
  }

  generateJwt(user: UserEntity) {
    return sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET);
  }
  buildUserResponse(user: UserEntity): UserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
