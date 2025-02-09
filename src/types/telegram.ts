declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export type TelegramInitData = string;

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export interface TelegramWebApp {
  initData: TelegramInitData;
  initDataUnsafe: {
    query_id: string;
    user?: TelegramUser;
    auth_date: number;
    hash: string;
  };
  ready: () => void;
  close: () => void;
  expand: () => void;
  onEvent: (eventType: string, callback: () => void) => void;
  offEvent: (eventType: string, callback: () => void) => void;
  sendData: (data: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  CloudStorage: {
    getItem: (key: string, callback: (error: string | null, value?: string) => void) => void;
    setItem: (key: string, value: string, callback?: (error: string | null, success?: boolean) => void) => void;
  };
}

export enum CloudStorageItem {
  Coins = 'coins',
}
