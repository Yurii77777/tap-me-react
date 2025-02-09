import { instanceForBackend } from '../../config/axios.config';

import { BACKEND_API } from '../../constants/backendApi';
import { TelegramInitData } from '../../types/telegram';
import { UserProgressData, UserProgressDataResponse, ValidateInitDataResponse } from '../types/telegram.types';

export const telegramService = {
  validateInitData: (initData: TelegramInitData): Promise<ValidateInitDataResponse> =>
    instanceForBackend.post(BACKEND_API.VALIDATE_INIT_DATA, { initData }),
  sendUserProgress: (data: UserProgressData): Promise<UserProgressDataResponse> => instanceForBackend.post(BACKEND_API.SEND_USER_PROGRESS, data),
};
