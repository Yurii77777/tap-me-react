import { useEffect, useState } from 'react';

import { MESSAGE } from '../messages/messages';

export const useTelegram = () => {
  const [isTgReady, setIsTgReady] = useState(false);
  const tg = window?.Telegram?.WebApp;

  useEffect(() => {
    if (!tg) {
      alert(MESSAGE.ERROR.FAILED_LOAD_TG);
      return;
    }

    tg.ready();

    if (tg?.initData) {
      setIsTgReady(true);
    } else {
      tg.onEvent('ready', () => {
        setIsTgReady(true);
      });
    }
  }, [tg]);

  return { tg, isTgReady };
};
