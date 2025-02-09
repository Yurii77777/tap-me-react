import { telegramService } from '../service/telegram.service';

import { TelegramInitData } from '../../types/telegram';
import { UserProgressData, UserProgressDataActionResponse, ValidateInitDataActionResponse } from '../types/telegram.types';

export const validateInitData = async (initData: TelegramInitData): Promise<ValidateInitDataActionResponse | undefined> => {
  const result = await telegramService.validateInitData(initData);

  if (!result || !result?.data) {
    throw new Error('Failed to validate init data!');
  }

  return result.data;
};

export const sendUserProgress = async (data: UserProgressData): Promise<UserProgressDataActionResponse | undefined> => {
  const result = await telegramService.sendUserProgress(data);

  if (!result || !result?.data) {
    throw new Error("Failed to send user's progress!");
  }

  return result.data;
};
