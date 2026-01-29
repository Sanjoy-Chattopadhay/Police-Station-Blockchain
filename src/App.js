import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xE457c3F1D36B1A02aE5c6A7230Fa2f88cEA5d6E1";

const CONTRACT_ABI = [
  "function reportIncident(string memory _description, string memory _severity) public",
  "function updateStatus(uint _id, uint8 _status) public",
  "function getIncident(uint _id) public view returns (uint id, address reporter, string description, string severity, uint8 status, uint timestamp)",
  "function incidentCount() public view returns (uint)",
  "function admin() public view returns (address)",
  "event IncidentReported(uint id, address reporter, string severity, uint timestamp)",
  "event StatusUpdated(uint id, uint8 newStatus)"
];

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const statusMap = ['Reported', 'Investigating', 'Resolved'];

  // Connect MetaMask
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(contractInstance);

        // Check if user is admin
        const adminAddress = await contractInstance.admin();
        setIsAdmin(adminAddress.toLowerCase() === accounts[0].toLowerCase());

        // Load incidents
        loadIncidents(contractInstance);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting wallet');
    }
  };

  // Load all incidents
  const loadIncidents = async (contractInstance) => {
    try {
      const count = await contractInstance.incidentCount();
      const incidentsList = [];
      
      for (let i = 1; i <= count; i++) {
        const incident = await contractInstance.getIncident(i);
        incidentsList.push({
          id: incident[0].toString(),
          reporter: incident[1],
          description: incident[2],
          severity: incident[3],
          status: statusMap[incident[4]],
          timestamp: new Date(Number(incident[5]) * 1000).toLocaleString()
        });
      }
      setIncidents(incidentsList.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  // Report new incident
  const reportIncident = async () => {
    if (!description) {
      alert('Please enter incident description');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.reportIncident(description, severity);
      await tx.wait();
      alert('Incident reported successfully!');
      setDescription('');
      setSeverity('Low');
      loadIncidents(contract);
    } catch (error) {
      console.error(error);
      alert('Error reporting incident');
    } finally {
      setLoading(false);
    }
  };

  // Update incident status (admin only)
  const updateIncidentStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const statusIndex = statusMap.indexOf(newStatus);
      const tx = await contract.updateStatus(id, statusIndex);
      await tx.wait();
      alert('Status updated successfully!');
      loadIncidents(contract);
    } catch (error) {
      console.error(error);
      alert('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>🔐 Cybersecurity Incident Reporter</h1>
        <p>Blockchain-based Immutable Incident Logging</p>
      </header>

      <div className="container">
        {!account ? (
          <button onClick={connectWallet} className="connect-btn">
            Connect MetaMask
          </button>
        ) : (
          <>
            <div className="account-info">
              <p><strong>Connected:</strong> {account.substring(0, 6)}...{account.substring(38)}</p>
              {isAdmin && <span className="admin-badge">ADMIN</span>}
            </div>

            <div className="report-section">
              <h2>Report New Incident</h2>
              <textarea
                placeholder="Describe the security incident..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
              <div className="severity-select">
                <label>Severity: </label>
                <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <button onClick={reportIncident} disabled={loading} className="submit-btn">
                {loading ? 'Processing...' : 'Report Incident'}
              </button>
            </div>

            <div className="incidents-section">
              <h2>Reported Incidents ({incidents.length})</h2>
              {incidents.length === 0 ? (
                <p>No incidents reported yet.</p>
              ) : (
                incidents.map((incident) => (
                  <div key={incident.id} className="incident-card">
                    <div className="incident-header">
                      <span className="incident-id">ID: {incident.id}</span>
                      <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
                        {incident.severity}
                      </span>
                      <span className={`status-badge ${incident.status.toLowerCase()}`}>
                        {incident.status}
                      </span>
                    </div>
                    <p className="description">{incident.description}</p>
                    <div className="incident-footer">
                      <small>Reporter: {incident.reporter.substring(0, 8)}...</small>
                      <small>{incident.timestamp}</small>
                    </div>
                    {isAdmin && (
                      <div className="admin-actions">
                        <button onClick={() => updateIncidentStatus(incident.id, 'Investigating')} disabled={loading}>
                          Mark Investigating
                        </button>
                        <button onClick={() => updateIncidentStatus(incident.id, 'Resolved')} disabled={loading}>
                          Mark Resolved
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;