import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { injected } from 'connectors';
import { getToken, unAuthenticateUser } from 'helpers/auth';
import { useEffect, useState } from 'react';

export const useEagerConnect = () => {
  const { activate, active, connector } = useWeb3React();
  const [tried, setTried] = useState(false);

  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts[0] && connector) {
      unAuthenticateUser();
    }
  };

  useEffect(() => {
    const { ethereum } = window as any;
    // trying to active if the account is being connected on the metamask
    if (connector === undefined || connector instanceof InjectedConnector) {
      injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized && getToken()) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
          unAuthenticateUser();
        }
      });
    }
    // listeners
    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};
