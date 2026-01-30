import { useState, useEffect } from 'react';
import {
  connectToWallet,
  getContractInstance,
  checkIsAdmin,
  loadAllCases,
  registerNewCase,
  updateCaseStatus as updateCaseStatusUtil
} from '../utils/blockchain';

export const useBlockchain = () => {
  const [account, setAccount] = useState('');
  const [allAccounts, setAllAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [cases, setCases] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= CONNECT WALLET ================= */
  const connectWallet = async () => {
    try {
      const accounts = await connectToWallet();
      setAccount(accounts[0]);
      setAllAccounts(accounts);

      const contractInstance = await getContractInstance();
      setContract(contractInstance);

      const adminStatus = await checkIsAdmin(contractInstance, accounts[0]);
      setIsAdmin(adminStatus);

      await loadCases(contractInstance);
    } catch (error) {
      console.error("Connection error:", error);
      
      if (error.message.includes("MetaMask not installed")) {
        alert("Please install MetaMask to use this application");
      } else if (error.message.includes("User rejected")) {
        alert("Connection rejected. Please approve the connection to continue.");
      } else if (error.code === 'BAD_DATA' || error.message.includes("could not decode")) {
        alert("Contract not found on this network. Please ensure you're connected to Sepolia testnet and the contract is deployed.");
      } else {
        alert("Failed to connect wallet: " + error.message);
      }
    }
  };

  /* ================= SWITCH ACCOUNT ================= */
  const switchAccount = async (newAccount) => {
    try {
      setAccount(newAccount);

      const contractInstance = await getContractInstance();
      setContract(contractInstance);

      const adminStatus = await checkIsAdmin(contractInstance, newAccount);
      setIsAdmin(adminStatus);

      await loadCases(contractInstance);
    } catch (error) {
      console.error("Error switching account:", error);
      alert("Failed to switch account: " + error.message);
    }
  };

  /* ================= LOAD CASES ================= */
  const loadCases = async (contractInstance) => {
    try {
      const allCases = await loadAllCases(contractInstance || contract);
      setCases(allCases);
    } catch (error) {
      console.error("Error loading cases:", error);
      setCases([]);
    }
  };

  /* ================= REGISTER CASE ================= */
  const registerCase = async (details, crimeType) => {
    if (!details) {
      alert("Enter FIR details");
      return false;
    }

    setLoading(true);
    try {
      await registerNewCase(contract, details, crimeType);
      await loadCases(contract);
      setLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      alert("Transaction Failed");
      setLoading(false);
      return false;
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (caseId, statusText) => {
    setLoading(true);
    try {
      await updateCaseStatusUtil(contract, caseId, statusText);
      await loadCases(contract);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  /* ================= LIVE EVENT LISTENER ================= */
  useEffect(() => {
    if (!contract) return;

    const handleCaseRegistered = (id, complainant, crimeType, time) => {
      const newCase = {
        id: id.toString(),
        complainant,
        details: "New FIR Registered",
        crimeType,
        status: "Registered",
        timestamp: new Date(Number(time) * 1000).toLocaleString()
      };
      setCases(prev => [newCase, ...prev]);
    };

    contract.on("CaseRegistered", handleCaseRegistered);

    return () => contract.removeAllListeners();
  }, [contract]);

  /* ================= ACCOUNT CHANGE LISTENER ================= */
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          try {
            setAccount(accounts[0]);
            setAllAccounts(accounts);
            
            const contractInstance = await getContractInstance();
            setContract(contractInstance);
            
            const adminStatus = await checkIsAdmin(contractInstance, accounts[0]);
            setIsAdmin(adminStatus);
            
            await loadCases(contractInstance);
          } catch (error) {
            console.error("Error handling account change:", error);
            // Don't show alert here as it can be annoying during normal usage
          }
        } else {
          // User disconnected all accounts
          setAccount('');
          setAllAccounts([]);
          setContract(null);
          setCases([]);
          setIsAdmin(false);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  return {
    account,
    allAccounts,
    contract,
    cases,
    isAdmin,
    loading,
    connectWallet,
    switchAccount,
    registerCase,
    updateStatus,
    loadCases
  };
};