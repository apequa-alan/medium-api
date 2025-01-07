import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { JWT_SECRET } from '@app/config';
import { UserService } from '@app/user/user.service';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = verify(token, JWT_SECRET) as UserEntity;
      req.user = await this.userService.findUserById(decoded.id);
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
