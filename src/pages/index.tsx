import { Box, Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { authenticateUser, unAuthenticateUser } from 'helpers/auth';
import React from 'react';

const Home = () => {
  const { activate, deactivate, account } = useWeb3React();
  return (
    <Box>
      Home
      {account ? (
        <div>
          {account}
          <Button
            onClick={async () => {
              deactivate();
              unAuthenticateUser();
            }}
          >
            Disconnect Metamask
          </Button>
        </div>
      ) : (
        <Button
          onClick={async () => {
            await activate(injected);
            authenticateUser(Math.random().toString(36).substr(2, 10));
          }}
        >
          Connect Metamask
        </Button>
      )}
    </Box>
  );
};

export default Home;
