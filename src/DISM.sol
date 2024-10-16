// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedIdentitySystem {
    struct User {
        string email;           // Email of the user
        bytes32 passwordHash;   // Hashed password
        string privateKey;      // Private key
        bool registered;        // Status to check if the user is registered
    }

    mapping(address => User) public users;

    event AccountCreated(address indexed user, string email);
    event LoginSuccessful(address indexed user);

    // Helper function to hash the password before storing
    function hashPassword(string memory _password) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_password));
    }

    // Function to generate a random 24-character private key
    function generatePrivateKey() private view returns (string memory) {
        bytes32 randomHash = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        bytes memory randomBytes = new bytes(24);

        for (uint256 i = 0; i < 24; i++) {
            // Generate a random character from 'a' to 'z'
            uint8 randomChar = uint8(uint256(randomHash) / (2**(8 * (31 - i)))) % 26 + 97; // ASCII 'a' = 97
            randomBytes[i] = bytes1(randomChar); // Cast to bytes1
        }
        
        return string(randomBytes);
    }

    // Function to create a new account (email, password)
    function createAccount(string memory _email, string memory _password) public {
        require(!users[msg.sender].registered, "Account already exists.");

        // Hash the password for security
        bytes32 hashedPassword = hashPassword(_password);
        
        // Generate a 24-character private key
        string memory generatedPrivateKey = generatePrivateKey();
        
        // Store user information
        users[msg.sender] = User({
            email: _email,
            passwordHash: hashedPassword,
            privateKey: generatedPrivateKey,
            registered: true
        });

        emit AccountCreated(msg.sender, _email);
    }

    // Function to log in using private key and password
    function login(string memory _privateKey, string memory _password) public returns (bool) {
        require(users[msg.sender].registered, "Account not registered.");

        // Verify private key and hashed password match the stored values
        require(keccak256(abi.encodePacked(users[msg.sender].privateKey)) == keccak256(abi.encodePacked(_privateKey)), "Invalid private key.");
        require(users[msg.sender].passwordHash == hashPassword(_password), "Invalid password.");

        // Emit the login event
        emit LoginSuccessful(msg.sender);

        return true;
    }

    // Function to get the private key associated with the user
    function getPrivateKey() public view returns (string memory) {
        require(users[msg.sender].registered, "Account not registered.");
        return users[msg.sender].privateKey;
    }
}
