import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@app/decorators/user.decorator';
import { ProfileResponseInterface } from '@app/types/profileResponse.interface';
import { ProfileService } from '@app/profile/profile.service';

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
}
