import React from 'react';
import { useBlockchain } from './hooks/useBlockchain';
import Header from './components/Header.js';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import './App.css';

function App() {
  const {
    account,
    allAccounts,
    cases,
    isAdmin,
    loading,
    connectWallet,
    switchAccount,
    registerCase,
    updateStatus
  } = useBlockchain();

  return (
    <div className="psit-layout">
      <Header 
        account={account}
        allAccounts={allAccounts}
        isAdmin={isAdmin}
        onSwitchAccount={switchAccount}
      />

      <div className="psit-body">
        <LeftSidebar account={account} isAdmin={isAdmin} />
        
        <MainContent 
          account={account}
          cases={cases}
          onRegister={registerCase}
          loading={loading}
          onConnect={connectWallet}
          isAdmin={isAdmin}
          onUpdateStatus={updateStatus}
        />
        
        <RightSidebar cases={cases} account={account} />
      </div>
    </div>
  );
}

export default App;