import React from 'react';

const RightSidebar = ({ cases, account }) => {
  const total = cases.length;
  const active = cases.filter(c => c.status === "Investigating").length;
  const closed = cases.filter(c => c.status === "Closed").length;

  return (
    <aside className="psit-right">
      <div className="card">
        <h3>Station Stats</h3>
        <p>Total FIR: {total}</p>
        <p>Active: {active}</p>
        <p>Closed: {closed}</p>
      </div>

      <div className="card">
        <h3>Blockchain</h3>
        <p>Network: Sepolia</p>
        <p>Status: {account ? 'Connected' : 'Disconnected'}</p>
      </div>
    </aside>
  );
};

export default RightSidebar;