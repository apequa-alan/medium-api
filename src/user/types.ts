import { UserEntity } from '@app/user/user.entity';

export type User = Omit<UserEntity, 'hashPassword'>;

export interface UserResponse {
  user: User & { token: string };
}
