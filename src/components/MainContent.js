import React from 'react';
import FIRRegistrationForm from './FIRRegistrationForm';
import FIRList from './FIRList';
import NetworkStatus from './NetworkStatus';

const MainContent = ({ account, cases, onRegister, loading, onConnect, isAdmin, onUpdateStatus }) => {
  return (
    <main className="psit-main">
      {!account ? (
        <>
          <NetworkStatus />
          <button className="connect-btn" onClick={onConnect}>
            Connect MetaMask
          </button>
        </>
      ) : (
        <>
          <FIRRegistrationForm onRegister={onRegister} loading={loading} />
          <FIRList cases={cases} isAdmin={isAdmin} onUpdateStatus={onUpdateStatus} loading={loading} />
        </>
      )}
    </main>
  );
};

export default MainContent;