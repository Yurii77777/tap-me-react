import { TelegramUser } from '../../../types/telegram';

export type UserAvatarProps = {
  user?: TelegramUser;
};

export enum UserAvatarType {
  IMAGE = 'image',
  INITIALS = 'initials',
  DEFAULT = 'default',
}

export interface UserAvatarData {
  type: UserAvatarType;
  value?: string;
}
