import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { Coin } from '../UI/Coin/Coin';
import { UserAvatar } from '../UI/UserAvatar/UserAvatar';

import { NUMBER_FORAM } from '../../constants/common.constants';
import { styles } from './styles';
import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ coins, user }) => {
  const formattedCoins = new Intl.NumberFormat(NUMBER_FORAM, {
    useGrouping: true,
  }).format(coins);

  return (
    <Box component="header" sx={styles.container}>
      <Box sx={styles.coinsParagraph}>
        <Coin /> <Typography sx={styles.coinsText}>{formattedCoins}</Typography>
      </Box>
      <UserAvatar user={user} />
    </Box>
  );
};
