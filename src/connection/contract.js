import { ethers } from "ethers";

// Alchemy API URL
const ALCHEMY_API_URL = `https://eth-sepolia.g.alchemy.com/v2/2Fr1dhd45RHJveRr5Y7uP4TlfMnlV2q9`;

// Contract ABI
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "AccountCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "createAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_privateKey",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "LoginSuccessful",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getPrivateKey",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "passwordHash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "privateKey",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "registered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Replace this with your deployed contract address
const contractAddress = "0x3E30BB036Aa2976988B884c03A7ddb073CF7bB51";

export const getContract = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed. Please install MetaMask.");
    }

    // Request MetaMask account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // MetaMask provider using window.ethereum for signing transactions
    const metaMaskProvider = new ethers.BrowserProvider(window.ethereum);

    // Get the signer from MetaMask
    const signer = await metaMaskProvider.getSigner();

    // Use Alchemy provider for reading data
    const alchemyProvider = new ethers.JsonRpcProvider(ALCHEMY_API_URL);

    // Create a contract instance with the MetaMask signer (for sending transactions)
    const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);

    return contractWithSigner;
  } catch (error) {
    throw new Error(`Failed to connect to the contract: ${error.message}`);
  }
};
