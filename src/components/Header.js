import React, { useState } from 'react';
import { shortenAddress } from '../utils/blockchain';

const Header = ({ account, allAccounts, isAdmin, onSwitchAccount }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="psit-header">
      <div className="header-content">
        <div>
          <h1>PSIT Police Station</h1>
          <p>Blockchain FIR Management System</p>
        </div>
        
        {account && (
          <div className="account-section">
            <div 
              className="account-display" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="account-info-header">
                <span className="account-label">Connected Account</span>
                <span className="account-address">{shortenAddress(account)}</span>
                {isAdmin && <span className="admin-badge">ADMIN</span>}
              </div>
              <span className="dropdown-arrow">{showDropdown ? '▲' : '▼'}</span>
            </div>
            
            {showDropdown && allAccounts.length > 1 && (
              <div className="account-dropdown">
                {allAccounts.map((acc, idx) => (
                  <div 
                    key={idx} 
                    className={`dropdown-item ${acc === account ? 'active' : ''}`}
                    onClick={() => {
                      onSwitchAccount(acc);
                      setShowDropdown(false);
                    }}
                  >
                    <span>{shortenAddress(acc)}</span>
                    {acc === account && <span className="check-mark">✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;