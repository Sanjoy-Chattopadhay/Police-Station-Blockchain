# 🚔 Blockchain FIR Management System

A Full Stack Blockchain-based FIR (First Information Report) Management
System built using:

-   ⚛ React Frontend
-   ⛓ Solidity Smart Contract
-   🔗 Ethers.js Blockchain Integration
-   🦊 MetaMask Wallet Authentication
-   🌐 Ethereum Sepolia Testnet

------------------------------------------------------------------------

## 📌 Project Overview

This system allows:

✅ Citizens to Register FIRs\
✅ Police Admin to Update FIR Status\
✅ Tamper-proof FIR Storage on Blockchain\
✅ Real-time FIR Updates using Smart Contract Events\
✅ MetaMask Wallet Authentication

------------------------------------------------------------------------

## 🏗 Architecture

Frontend (React)\
⬇\
Ethers.js Blockchain Layer\
⬇\
Smart Contract (Solidity)\
⬇\
Ethereum Sepolia Testnet

------------------------------------------------------------------------

## 🧠 Key Features

### 👤 User

-   Connect MetaMask Wallet
-   Register FIR
-   View FIR Records

### 👮 Admin

-   Update FIR Status
    -   Registered → Investigating → Closed

### 🔐 Security

-   Blockchain immutability
-   Wallet-based identity
-   Smart contract controlled admin access

------------------------------------------------------------------------

## 📂 Project Structure

    project-root
    │
    ├── contracts/
    │   └── PoliceCaseReporter.sol
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── utils/blockchain.js
    │   │   ├── hooks/useBlockchain.js
    │   │   └── App.js
    │   │
    │   └── package.json
    │
    └── README.md

------------------------------------------------------------------------

## ⚙️ Prerequisites

### 1️⃣ Node.js

Download → https://nodejs.org

Check:

    node -v
    npm -v

------------------------------------------------------------------------

### 2️⃣ MetaMask Extension

Install → https://metamask.io/download/

------------------------------------------------------------------------

### 3️⃣ Sepolia Test ETH

Get Free ETH: https://sepoliafaucet.com/

------------------------------------------------------------------------

## 🪙 Network Configuration

  Network        Sepolia Testnet
  -------------- -----------------
  Chain ID       11155111
  Hex Chain ID   0xaa36a7

------------------------------------------------------------------------

## 🚀 Local Setup Instructions

### 📥 Step 1 --- Clone Repository

    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME

------------------------------------------------------------------------

### 📦 Step 2 --- Install Dependencies

    cd frontend
    npm install

------------------------------------------------------------------------

### ▶ Step 3 --- Run Frontend

    npm start

App will run at:

    http://localhost:3000

------------------------------------------------------------------------

## 🧾 Smart Contract Deployment (If Needed)

### Using Remix IDE

1.  Open https://remix.ethereum.org
2.  Upload Solidity Contract
3.  Compile
4.  Connect MetaMask
5.  Select Sepolia Network
6.  Deploy Contract
7.  Copy Contract Address

------------------------------------------------------------------------

## 🔧 Configure Contract Address

Update inside:

    src/utils/blockchain.js

    export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_ADDRESS";

------------------------------------------------------------------------

## 🦊 MetaMask Setup

1.  Login MetaMask
2.  Switch to Sepolia Network
3.  Connect Wallet in App

------------------------------------------------------------------------

## 📊 How System Works

### Wallet Connection

-   Uses MetaMask Provider
-   Switches to Sepolia Automatically

### FIR Registration

User submits: - FIR Details - Crime Type

Stored on Blockchain.

------------------------------------------------------------------------

### FIR Status Update

Only Admin Wallet Can: - Move FIR Forward in Lifecycle

------------------------------------------------------------------------

### Live FIR Updates

Uses Smart Contract Events: CaseRegistered Event

------------------------------------------------------------------------

## 🧪 Testing Flow

### User Flow

Connect Wallet → Register FIR → View FIR List

### Admin Flow

Connect Admin Wallet → Update FIR Status

------------------------------------------------------------------------

## ❗ Troubleshooting

### MetaMask Not Detected

Install MetaMask Extension.

### Wrong Network Error

Switch to Sepolia Network.

### Contract Not Found

Check: - Correct Network - Correct Contract Address

------------------------------------------------------------------------

## 🛡 Security Notes

-   Blockchain prevents FIR Tampering
-   Wallet = Identity
-   Smart Contract = Authority Control

------------------------------------------------------------------------

## 🌟 Future Improvements

-   IPFS FIR Document Storage
-   Police Dashboard Analytics
-   Multi Police Station Support
-   Role Based Access (Inspector, SP, etc)
-   Mobile App Version

------------------------------------------------------------------------

## 👨‍💻 Tech Stack

  Layer          Tech
  -------------- -----------------
  Frontend       React
  Blockchain     Solidity
  Web3 Library   Ethers.js
  Wallet         MetaMask
  Network        Sepolia Testnet

------------------------------------------------------------------------

## 📜 License

MIT License

------------------------------------------------------------------------

## 🙌 Author

Built for Blockchain + Cyber Security Learning
