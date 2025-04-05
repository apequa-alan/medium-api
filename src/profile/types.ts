import { User } from '@app/user/types';

export type ProfileType = User & { following: boolean };
