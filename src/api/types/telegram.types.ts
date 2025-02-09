import { TelegramUser } from '../../types/telegram';

export type ValidateInitDataResponse = {
  data: {
    data: {
      isValid: boolean;
      user: TelegramUser;
    };
    status: number;
    message: string;
  };
};

export type ValidateInitDataActionResponse = {
  data: {
    isValid: boolean;
    user: TelegramUser;
  };
  status: number;
  message: string;
};

type BackendUserModel = {
  _id: string;
  telegramUserId: number;
  telegramName: string;
  coins: number;
};

export type UserProgressData = {
  telegramUserId: number;
  coins: number;
};

export type UserProgressDataResponse = {
  data: {
    data: {
      user: BackendUserModel;
    };
    status: number;
    message: string;
  };
};

export type UserProgressDataActionResponse = {
  data: {
    user: BackendUserModel;
  };
  status: number;
  message: string;
};
