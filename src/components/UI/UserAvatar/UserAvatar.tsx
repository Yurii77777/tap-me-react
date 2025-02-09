import { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import { MESSAGE } from '../../../messages/messages';
import { handleUserAvatar } from './helpers';
import { UserAvatarProps, UserAvatarType } from './types';
import { styles } from './styles';

export const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  const { type, value } = handleUserAvatar(user);

  const renderContent = () => {
    switch (type) {
      case UserAvatarType.IMAGE:
        if (value) {
          return <Avatar src={value} sx={styles.avatar} />;
        }
        break;

      case UserAvatarType.INITIALS:
        return <Typography sx={styles.initials}>{value}</Typography>;

      case UserAvatarType.DEFAULT:
      default:
        return <Typography sx={styles.defaultParagraph}>{MESSAGE.COMMON.EMPTY_USER_NAME}</Typography>;
    }
  };

  return <Box>{renderContent()}</Box>;
};
