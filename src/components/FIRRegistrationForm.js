import React, { useState } from 'react';

const FIRRegistrationForm = ({ onRegister, loading }) => {
  const [details, setDetails] = useState('');
  const [crimeType, setCrimeType] = useState('Theft');

  const handleSubmit = async () => {
    const success = await onRegister(details, crimeType);
    if (success) {
      setDetails('');
      setCrimeType('Theft');
    }
  };

  return (
    <div className="card">
      <h2>Register FIR</h2>

      <textarea
        placeholder="Enter FIR Details..."
        value={details}
        onChange={e => setDetails(e.target.value)}
      />

      <select
        value={crimeType}
        onChange={e => setCrimeType(e.target.value)}
      >
        <option>Theft</option>
        <option>Fraud</option>
        <option>Assault</option>
        <option>Cyber Crime</option>
      </select>

      <button 
        className="submit-btn" 
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Register FIR'}
      </button>
    </div>
  );
};

export default FIRRegistrationForm;