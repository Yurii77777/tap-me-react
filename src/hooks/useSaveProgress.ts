import { useCallback } from 'react';

import { MESSAGE } from '../messages/messages';
import { CloudStorageItem } from '../types/telegram';
import { useTelegram } from './useTelegram';

export const useSaveProgress = (coins: number) => {
  const { tg } = useTelegram();

  return useCallback(() => {
    if (!tg?.CloudStorage) return;

    // Save progress to the CloudStorage
    tg.CloudStorage.setItem(CloudStorageItem.Coins, String(coins), (error) => {
      if (error) {
        alert(MESSAGE.ERROR.FAILED_TO_SAVE_PROGRESS);
        return;
      }

      // This method does not work if you launch the mini App from the inline button!
      tg.sendData(JSON.stringify({ coins }));
    });
  }, [coins, tg]);
};
