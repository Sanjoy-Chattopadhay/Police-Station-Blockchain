import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [networkInfo, setNetworkInfo] = useState({
    hasMetaMask: false,
    chainId: '',
    chainName: '',
    isCorrectNetwork: false
  });

  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          const hasMetaMask = true;
          const isCorrectNetwork = chainId === '0xaa36a7';
          
          let chainName = 'Unknown';
          if (chainId === '0xaa36a7') chainName = 'Sepolia Testnet';
          else if (chainId === '0x1') chainName = 'Ethereum Mainnet';
          else if (chainId === '0x5') chainName = 'Goerli Testnet';
          else if (chainId === '0x89') chainName = 'Polygon Mainnet';

          setNetworkInfo({
            hasMetaMask,
            chainId,
            chainName,
            isCorrectNetwork
          });
        } catch (error) {
          console.error("Error checking network:", error);
        }
      }
    };

    checkNetwork();

    if (window.ethereum) {
      window.ethereum.on('chainChanged', checkNetwork);
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('chainChanged', checkNetwork);
        }
      };
    }
  }, []);

  if (!networkInfo.hasMetaMask) {
    return (
      <div className="network-warning error">
        <strong>⚠️ MetaMask Not Detected</strong>
        <p>Please install MetaMask browser extension to use this application.</p>
        <a 
          href="https://metamask.io/download/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="install-link"
        >
          Install MetaMask
        </a>
      </div>
    );
  }

  if (!networkInfo.isCorrectNetwork) {
    return (
      <div className="network-warning warning">
        <strong>⚠️ Wrong Network</strong>
        <p>Currently connected to: <strong>{networkInfo.chainName}</strong></p>
        <p>Please switch to <strong>Sepolia Testnet</strong> to use this application.</p>
        <p className="network-hint">The app will prompt you to switch networks when you click "Connect MetaMask"</p>
      </div>
    );
  }

  return (
    <div className="network-warning success">
      <strong>✓ Connected to Sepolia Testnet</strong>
    </div>
  );
};

export default NetworkStatus;