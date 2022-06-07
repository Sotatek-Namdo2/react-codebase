import { Box } from '@mui/material';
import React from 'react';

interface Props {
  name?: string;
  children: React.ReactChild;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Layout;
