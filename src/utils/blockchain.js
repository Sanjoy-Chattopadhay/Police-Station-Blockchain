import { ethers } from 'ethers';

/* ================= CONFIG ================= */

export const CONTRACT_ADDRESS = "0x7a6DE621cAc809A1A850F091a2e4eDac33054Ea6";

export const CONTRACT_ABI = [
  "function admin() view returns(address)",
  "function caseCount() view returns(uint256)",
  "function getCase(uint256) view returns(uint256,address,string,string,uint8,uint256)",
  "function registerCase(string,string)",
  "function updateCaseStatus(uint256,uint8)",
  "event CaseRegistered(uint256 id,address complainant,string crimeType,uint256 timestamp)"
];

export const STATUS_MAP = ['Registered', 'Investigating', 'Closed'];

/* ================= WALLET FUNCTIONS ================= */

export const connectToWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  if (chainId !== '0xaa36a7') {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }]
    });
  }

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });

  return accounts;
};

export const getContractInstance = async (address = CONTRACT_ADDRESS) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  return new ethers.Contract(address, CONTRACT_ABI, signer);
};

export const checkIsAdmin = async (contract, account) => {
  try {
    const adminAddr = await contract.admin();
    return adminAddr.toLowerCase() === account.toLowerCase();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

/* ================= CASE FUNCTIONS ================= */

export const loadAllCases = async (contract) => {
  try {
    const count = await contract.caseCount();
    const cases = [];

    for (let i = 1; i <= count; i++) {
      const data = await contract.getCase(i);

      cases.push({
        id: data[0].toString(),
        complainant: data[1],
        details: data[2],
        crimeType: data[3],
        status: STATUS_MAP[data[4]],
        timestamp: new Date(Number(data[5]) * 1000).toLocaleString()
      });
    }

    return cases.reverse();
  } catch (error) {
    console.error("Error loading cases:", error);
    return [];
  }
};

export const registerNewCase = async (contract, details, crimeType) => {
  const tx = await contract.registerCase(details, crimeType);
  await tx.wait();
  return tx;
};

export const updateCaseStatus = async (contract, caseId, statusText) => {
  const statusIndex = STATUS_MAP.indexOf(statusText);
  const tx = await contract.updateCaseStatus(caseId, statusIndex);
  await tx.wait();
  return tx;
};

/* ================= HELPER FUNCTIONS ================= */

export const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};