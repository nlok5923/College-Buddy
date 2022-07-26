// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

contract LearnAndEarn {
    function mint(address to, uint256 amount) public {}
    function burn(address from, uint256 amount) public {}
}

contract InstituteFundsManager {
    
    address fundsOwner;
    string public instituteName;
    address coinContractAddress = 0xC760202A0d87ECD6b53a8bbc72FF63a9b411986D;
    LearnAndEarn laeContract;
    string[] allStreams;
    mapping(string => uint) streamBalance;
    uint moduleCount = 1000000;
    address distributor = 0xb1B9ceEb2A1eE407caaf918830D37EC6bd0A8401;

    constructor(string memory _name) {
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
        laeContract.mint(distributor, msg.value * 1000);
    }

    function addModule(uint _noOfModules) public payable {
        moduleCount = _noOfModules;
    }

    function getReward() public {
        moduleCount = moduleCount - 1;
        laeContract.mint(msg.sender, 1000000000000000000 * 100);
    }

    function getAllStreams() public view returns(string[] memory) {
        return allStreams;
    }
    // in future add student count as well
}