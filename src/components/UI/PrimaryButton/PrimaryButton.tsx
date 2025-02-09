import { Button } from '@mui/material';
import { FC } from 'react';

import { styles } from './styles';
import { MESSAGE } from '../../../messages/messages';
import { STEP_TO_INCREASE_COINS } from '../../../constants/common.constants';
import { PrimaryButtonProps } from './types';

export const PrimaryButton: FC<PrimaryButtonProps> = ({ setCoins }) => {
  const handleClick = () => {
    setCoins((prev: number) => prev + STEP_TO_INCREASE_COINS);
  };

  return (
    <Button sx={styles} onClick={handleClick}>
      {MESSAGE.BUTTON.TAP_ME}
    </Button>
  );
};
