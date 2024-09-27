# NFT-Gated Event Manager

This project implements an NFT-gated event management system using Solidity smart contracts. It allows users to create events and register for them, but only if they own a specific NFT. The system is built using Hardhat and deployed on the Lisk Sepolia testnet.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage events using smart contracts
- NFT-based access control for event registration
- Secure event registration process
- Deployment scripts for Lisk Sepolia testnet
- Comprehensive test suite

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An Ethereum wallet with some Lisk Sepolia ETH for deployment and testing
- A Lisk Sepolia RPC URL

## Installation

1. Clone the repository:
   ```
   https://github.com/DonGuillotine/nft-gated-event-manager.git
   cd nft-gated-event-manager
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   LISK_SEPOLIA_RPC_URL=your_LISK_sepolia_rpc_url
   PRIVATE_KEY=your_private_key
   ```
   Replace `your_LISK_sepolia_rpc_url` and `your_private_key` with your actual Lisk Sepolia RPC URL and the private key of your Ethereum wallet.

## Usage

### Compile Contracts

```
npx hardhat compile
```

### Run Tests

```
npm test
```

#### All tests passed

![alt text](/screenshots/image.png)

### Deploy to Lisk Sepolia Testnet

```
npx hardhat run scripts/deploy.js --network lisk-sepolia
```

## Smart Contracts

### EventNFT.sol

This contract implements the ERC721 standard for the event access NFT. It includes:

- Minting functionality (restricted to the contract owner)
- URI storage for token metadata

### EventManager.sol

This contract manages the events and registrations. It includes:

- Event creation (restricted to the contract owner)
- Event registration (restricted to NFT holders)
- Queries for event details and registration status

## Testing

The project includes a comprehensive test suite covering all main functionalities of the smart contracts. To run the tests:

```
npm test
```

## Deployment

The contracts are designed to be deployed on the Lisk Sepolia testnet. To deploy:

1. Ensure your `.env` file is correctly set up with your Lisk Sepolia RPC URL and private key.
2. Run the deployment script:
   ```
   npx hardhat run scripts/deploy.js --network lisk-sepolia
   ```
3. The script will output the addresses of the deployed contracts. Save these for future interactions.

## Security

This project implements several security best practices:

- Use of OpenZeppelin's battle-tested contract implementations
- Access control for administrative functions
- Checks for reentrancy attacks
- Input validation

However, as with any smart contract project, it's recommended to conduct a thorough audit before using in a production environment.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any additional questions or support, please open an issue in the GitHub repository.
