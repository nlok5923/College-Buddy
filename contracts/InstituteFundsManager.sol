// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

contract LearnAndEarn {
    function mint(address to, uint256 amount) public {}
    function burn(address from, uint256 amount) public {}
    function transfer(address from, uint256 amount) public {}
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

    function depositFundsToStream(string memory _streamCode, uint256 _noOfTokens) public {
        // deposit shouldn't be done with zero fund 
        require(_noOfTokens != 0, "Can't deposit zero token");
        // min 200 tokens needed to post the advertisement
        require(_noOfTokens >= 200, "Not enough tokens to advertise");
        streamBalance[_streamCode] = streamBalance[_streamCode] + _noOfTokens; 
    }

    function getStreamFunds(string memory _streamCode) public view returns(uint256) {
        return streamBalance[_streamCode];
    }

    function redeemToken(uint256 _amount) public {
        laeContract.transfer(msg.sender, _amount * 1000000000000000000);
    }

    // this is just for testing purpose
    function mintSomeTokens() public {
        laeContract.mint(address(this), 1000000000000000000 * 10000000);
    }

    function addModule(uint _noOfModules, string memory _streamCode, uint256 _noOfTokens) public {
        // minting a module will cost 100 tokens each
        require(_noOfTokens >= _noOfModules * 100, "Not enough tokens transfered");
        moduleCount = _noOfModules;
        streamBalance[_streamCode] = streamBalance[_streamCode] + _noOfTokens;
    }

    function getReward() public {
        // currently completing a single module will incentivize user with 100 LAE tokens 
        require(moduleCount >= 1, "No more rewarding modules availaible");
        moduleCount = moduleCount - 1;
        laeContract.transfer(msg.sender, 1000000000000000000 * 100);
        // laeContract.mint(msg.sender, 1000000000000000000 * 100);
    }

    function getAllStreams() public view returns(string[] memory) {
        return allStreams;
    }
    // in future add student count as well
}