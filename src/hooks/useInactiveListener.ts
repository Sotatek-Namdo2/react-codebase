import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { ethers } from 'ethers';
import { errorMessage } from 'messages/errorMessages';
import { useEffect } from 'react';
import { useToast } from './useToast';

export const useInactiveListener = (suppress = false) => {
  const { active, error, activate, deactivate } = useWeb3React();
  const { createToast } = useToast();
  const validChainId = ethers.utils.hexlify(Number(process.env.REACT_APP_CHAIN_ID));

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.removeAllListeners(['networkChanged']);
    }

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = async (chainId: string | number) => {
        if (chainId.toString() !== validChainId.toString()) {
          createToast({
            message: errorMessage.META_MASK_WRONG_NETWORK.message,
            type: 'error',
          });
          return;
        }
      };

      injected.on('Web3ReactDeactivate', () => {});

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [active, error, suppress, activate, deactivate]);
};
