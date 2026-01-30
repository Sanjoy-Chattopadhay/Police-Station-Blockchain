import React from 'react';

const LeftSidebar = ({ account, isAdmin }) => {
  return (
    <aside className="psit-left">
      <h3>PSIT Police</h3>
      <p>FIR Explorer Portal</p>

      <div className="menu-box">
        <p>🏠 Dashboard</p>
        <p>📄 FIR Records</p>
        <p>📊 Reports</p>
        <p>⚙ Settings</p>
      </div>

      {account && (
        <div className="account-details">
          <h4>Your Account</h4>
          <p className="full-address">{account}</p>
          {isAdmin && <p className="admin-text">Administrator Access</p>}
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;