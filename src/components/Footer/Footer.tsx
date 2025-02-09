import { Box, Link, Typography } from '@mui/material';

import { styles } from './styles';

export const Footer = () => {
  return (
    <Box component="footer" sx={styles.container}>
      <Typography sx={styles.paagraph}>
        TG:{' '}
        <Link href="https://t.me/Yurets7777" target="_blank" rel="noopener" underline="none" color="inherit">
          @Yurets7777
        </Link>
      </Typography>
    </Box>
  );
};
