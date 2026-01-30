import React from 'react';

const FIRList = ({ cases, isAdmin, onUpdateStatus, loading }) => {
  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'Registered') return 'Investigating';
    if (currentStatus === 'Investigating') return 'Closed';
    return null;
  };

  const getStatusClass = (status) => {
    if (status === 'Registered') return 'status-registered';
    if (status === 'Investigating') return 'status-investigating';
    if (status === 'Closed') return 'status-closed';
    return '';
  };

  return (
    <div className="card">
      <h2>FIR Records</h2>

      {cases.length === 0 ? (
        <p className="no-records">No FIR records found</p>
      ) : (
        cases.map(c => {
          const nextStatus = getNextStatus(c.status);
          
          return (
            <div key={c.id} className="fir-row">
              <div className="fir-content">
                <div className="fir-header">
                  <strong>Case #{c.id}</strong>
                  <span className={`status-badge ${getStatusClass(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <p className="fir-details">{c.details}</p>
                <div className="fir-info">
                  <span className="info-item">
                    <strong>Type:</strong> {c.crimeType}
                  </span>
                  <span className="info-item">
                    <strong>Complainant:</strong> {c.complainant.slice(0, 6)}...{c.complainant.slice(-4)}
                  </span>
                  <span className="info-item">
                    <strong>Date:</strong> {c.timestamp}
                  </span>
                </div>
              </div>

              {isAdmin && nextStatus && (
                <div className="admin-actions">
                  <button
                    className="status-update-btn"
                    onClick={() => onUpdateStatus(c.id, nextStatus)}
                    disabled={loading}
                  >
                    {loading ? '⏳ Updating...' : `Mark as ${nextStatus}`}
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default FIRList;