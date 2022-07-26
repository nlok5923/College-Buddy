// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

contract LearnAndEarn {
    function mint(address to, uint256 amount) public {}
    function burn(address from, uint256 amount) public {}
}

contract InstituteFundsManager {
    
    address fundsOwner;
    string public instituteName;
    address coinContractAddress = 0x6577A4409013c772aF780B46FC05f52B69e51caf;
    LearnAndEarn laeContract;
    string[] allStreams;
    mapping(string => uint) streamBalance;
    uint moduleCount = 0;

    function initialize(string memory _name) public {
        require(fundsOwner == address(0), "already initialized");
        fundsOwner = msg.sender;
        instituteName = _name;
        laeContract = LearnAndEarn(coinContractAddress);
    }

    function addStreams(string memory _streamCode) external {
        //adding streams to the institute.
        streamBalance[_streamCode] = 0;
        allStreams.push(_streamCode);
    }

    function depositFundsToStream(string memory _streamCode) public payable {
        // deposit shouldn't be done with zero fund 
        require(msg.value != 0, "No funds transfered");
        streamBalance[_streamCode] = streamBalance[_streamCode] + msg.value; 
        laeContract.mint(address(this), msg.value);
    }

    function addModule(uint _noOfModules) public payable {
        moduleCount = _noOfModules;
    }

    function redeemModule() public {
        require(moduleCount >= 1, "No more modules avalaible");
        moduleCount--;
        laeContract.mint(msg.sender, 100 * 10 ** 18);
    }

    function getAllStreams() public view returns(string[] memory) {
        return allStreams;
    }
    // in future add student count as well
}