import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { PrimaryButton } from '../../components/UI/PrimaryButton/PrimaryButton';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import { useTelegram } from '../../hooks/useTelegram';
import { useSaveProgress } from '../../hooks/useSaveProgress';

import { INITIAL_COINS_VALUE, STEP_TO_SAVE_PROGRESS } from '../../constants/common.constants';
import { sendUserProgress, validateInitData } from '../../api/action/telegram.action';
import { CloudStorageItem, TelegramUser } from '../../types/telegram';
import { MESSAGE } from '../../messages/messages';
import { styles } from './styles';

export const AppContainer = () => {
  const [coins, setCoins] = useState<number>(INITIAL_COINS_VALUE);
  const [user, setUser] = useState<TelegramUser>();
  const isInitialized = useRef(false);

  const { tg, isTgReady } = useTelegram();
  const saveProgress = useSaveProgress(coins);

  const { mutateAsync: validateUserData } = useMutation({
    mutationFn: validateInitData,
    onSuccess: (data) => {
      if (!data) {
        alert(MESSAGE.ALERT.FAILED_VALIDATE_USER);
        return;
      }

      const isValid = data?.data?.isValid;
      const isUser = !!data?.data?.user;

      if (!isValid || !isUser) {
        alert(MESSAGE.ALERT.INVALID_USER_DATA);
        return;
      }

      setUser(data?.data?.user);
    },
  });

  const { mutateAsync: sendUserProgressToBackend } = useMutation({
    mutationFn: sendUserProgress,
    onSuccess: (data) => {
      if (!data) {
        alert(MESSAGE.ALERT.FAILED_SAVE_PROGRESS);
        return;
      }
    },
  });

  useEffect(() => {
    if (!user) return;

    if (coins % STEP_TO_SAVE_PROGRESS === 0) {
      saveProgress();

      sendUserProgressToBackend({
        telegramUserId: tg.initDataUnsafe.user?.id as number,
        coins,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins, saveProgress, user]);

  // Validate initial user data
  useEffect(() => {
    const isEnoughData = isTgReady && !!tg?.initData && !!tg?.CloudStorage;

    if (!isEnoughData) return;

    if (isInitialized.current) return;
    isInitialized.current = true;

    validateUserData(tg.initData).catch((err) => {
      alert(`${MESSAGE.ALERT.INVALID_INIT_DATA} ${err}`);
    });

    tg.CloudStorage.getItem(CloudStorageItem.Coins, (error, value) => {
      if (error) {
        alert(MESSAGE.ERROR.FAILED_TO_GET_INITIAL_DATA);
        return;
      }

      const storedCoins = value ? Number(value) : INITIAL_COINS_VALUE;
      setCoins(storedCoins);
    });
  }, [isTgReady, tg, validateUserData]);

  return (
    <Box component="main" sx={styles}>
      <Header coins={coins} user={user} />
      <PrimaryButton setCoins={setCoins} />
      <Footer />
    </Box>
  );
};
