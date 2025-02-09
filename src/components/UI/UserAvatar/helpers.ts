import { TelegramUser } from '../../../types/telegram';
import { UserAvatarData, UserAvatarType } from './types';

export const handleUserAvatar = (user?: TelegramUser): UserAvatarData => {
  if (!user) {
    return { type: UserAvatarType.DEFAULT };
  }

  if (!!user?.photo_url) {
    return { type: UserAvatarType.IMAGE, value: user.photo_url };
  }

  const fullName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();

  if (fullName) {
    const initials = fullName
      .split(/\s+/)
      .map((word) => word[0]?.toUpperCase() || '')
      .join('');

    if (initials) {
      return { type: UserAvatarType.INITIALS, value: initials };
    }
  }

  return { type: UserAvatarType.DEFAULT };
};
