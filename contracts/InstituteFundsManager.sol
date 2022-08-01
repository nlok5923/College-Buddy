// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

contract DaiXToken {
    function transfer(address from, uint256 amount) public {}
    function balanceOf(address account) public view virtual returns (uint256) {}
}

/**
 *  for tokenized modules saving the funds into this smart contract
 *  for POAP based events and normal advertisement saving the funds into  distributor contract
 *  and updating the balances in streamBalance[_streamCode] 
 **/ 

contract InstituteFundsManager {
    
    address fundsOwner;
    string public instituteName;
    // need to pass fDaiX token address here as that i should transfer the actual DaiX token 
    address coinContractAddress = 0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00;
    address distributorAddress = 0x31F1574875DBf52b4A4dCfDD40BC47a2515A4F58;
    DaiXToken DaiXContract;
    string[] public allStreams;
    mapping(string => uint) public streamBalance;
    mapping(string => uint) public oldStreamBalance;
    uint256 moduleCount = 0;
    uint256 oldModuleBalances = 0;

    constructor(string memory _name, address _instituteManagerAddress) {
        fundsOwner = _instituteManagerAddress;
        instituteName = _name;
        DaiXContract = DaiXToken(coinContractAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == fundsOwner, "Can only be called from owner");
        _;
    }

    // contain all the streams 
    function addStreams(string memory _streamCode) onlyOwner public  {
        //adding streams to the institute.
        bytes memory _streamCodeLength = bytes(_streamCode); // Uses memor
        require(_streamCodeLength.length != 0, "Stream code can't be an empty string");
        streamBalance[_streamCode] = 0;
        allStreams.push(_streamCode);
    }

    // any fund send to the below function will be here in this contract itself 
    function depositFundsToStream(string memory _streamCode, uint256 _noOfTokens) public {
        // deposit shouldn't be done with zero fund 
        require(_noOfTokens != 0, "Can't deposit zero token");
        // no of token should be greater than 2 
        require(_noOfTokens == 2, "Not equal no of tokens to advertise");
        // the balance should get updated in the contract account first
        uint256 _updatedBalance = oldStreamBalance[_streamCode] + 2;
        require(DaiXContract.balanceOf(address(this)) == _updatedBalance * 1000000000000000000, "Balance hasn't updated yet");
        // incase the balance updated in account update it here as well 
        streamBalance[_streamCode] = streamBalance[_streamCode] + _noOfTokens;
        oldStreamBalance[_streamCode] = streamBalance[_streamCode];
    }

    function transferFundsToDistribute(string memory _streamCode) public {
        require(streamBalance[_streamCode] > 0, "Doesn't matter stream don't get funds");
        // transfering contract token to distributor contract and then we will call the distribute function from gelato
        DaiXContract.transfer(distributorAddress, streamBalance[_streamCode]);
        streamBalance[_streamCode] = 0;
        oldStreamBalance[_streamCode] = 0;
    }

    function getContractBalance() public view returns(uint256) {
        return DaiXContract.balanceOf(address(this));
    }

    function getStreamFunds(string memory _streamCode) public view returns(uint256) {
        return streamBalance[_streamCode];
    }

    // this method is just for testing purpose
    function redeemToken(uint256 _amount) public {
        DaiXContract.transfer(msg.sender, _amount * 1000000000000000000);
    }

    // modules for now is visible to all users

    function addModule(uint _noOfModules, uint256 _noOfTokens) public {
        // only two token per module 
        // diluting the security for the testing purposes 
        // require(_noOfTokens == _noOfModules * 2, "Not enough tokens transfered");
        uint256 _updatedBalance = oldModuleBalances + _noOfModules * 2;
        // require(DaiXContract.balanceOf(address(this)) == _updatedBalance * 1000000000000000000, "Probably you don't sent enough tokens");
        moduleCount = moduleCount + _noOfModules;
        oldModuleBalances = _updatedBalance;
    }

    // basically some how i need to keep track whether the person calling the function is actually a student 
    // till now this is the most vulnerable method to get attacked
    function getReward() public {
        // currently completing a single module will incentivize user with 100 LAE tokens 
        require(moduleCount >= 1, "No more rewarding modules availaible");
        moduleCount = moduleCount - 1;
        // change the transfer amount to 2 tokens only 
        DaiXContract.transfer(msg.sender, 1000000000000000000 * 2);
    }

    function getAllStreams() public view returns(string[] memory) {
        return allStreams;
    }
}