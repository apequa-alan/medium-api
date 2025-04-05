import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@app/decorators/user.decorator';
import { ProfileResponseInterface } from '@app/types/profileResponse.interface';
import { ProfileService } from '@app/profile/profile.service';
import { AuthGuard } from '@app/user/guards/auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      username,
    );
    return this.profileService.buildUserProfile(profile);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async followToProfile(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.followToProfile(
      currentUserId,
      username,
    );
    return this.profileService.buildUserProfile(profile);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unFollowFromProfile(
    @User('id') currentUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.unFollowFromProfile(
      currentUserId,
      username,
    );
    return this.profileService.buildUserProfile(profile);
  }
}
