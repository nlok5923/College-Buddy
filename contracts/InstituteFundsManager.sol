// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

import {
    ISuperfluid,
    ISuperToken,
    SuperAppBase,
    SuperAppDefinitions
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import { IDAv1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

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
    // below address is of fDaix so no need to change this address as well
    address coinContractAddress = 0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00;
    // no we don't need this because now institute itself is distrbutor as well
    // address distributorAddress = 0x31F1574875DBf52b4A4dCfDD40BC47a2515A4F58;
    DaiXToken DaiXContract;
    string[] public allStreams;
    uint256 accountBalance = 0;
    uint256 oldAccountBalance = 0;
    uint256 moduleCount = 0;
    uint256 oldModuleBalances = 0;
    mapping(address => bool) private validStudents;
    
    ISuperToken public spreaderToken;                  // Token to be distributed to unit holders by distribute() function

    using IDAv1Library for IDAv1Library.InitData;      // Creating idaV1 object for easy use of IDA functions
    IDAv1Library.InitData public idaV1;

    uint32 public constant INDEX_ID = 0;               // The IDA Index. Since this contract will only use one index, we'll hardcode it to "0".
    mapping(address => uint128) public shareUnits;
    // below is gelato address no need to change this address
    address public owner = 0xc1C6805B857Bef1f412519C4A842522431aFed39; 

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to access this method");
        _;
    }

    modifier fundsOwnerCheck() {
        require(msg.sender == fundsOwner, "Can only be called from owner");
        _;
    }

    constructor(
        string memory _name, 
        address _instituteManagerAddress,
        ISuperfluid _host,
        ISuperToken _spreaderToken) {
        fundsOwner = _instituteManagerAddress;
        instituteName = _name;
        DaiXContract = DaiXToken(coinContractAddress);
        require(address(_host) == _spreaderToken.getHost(), "!superToken");
        spreaderToken = _spreaderToken;
        idaV1 = IDAv1Library.InitData(
            _host,
            IInstantDistributionAgreementV1(
                address(_host.getAgreementClass(keccak256("org.superfluid-finance.agreements.InstantDistributionAgreement.v1")))
            )
        );
        idaV1.createIndex(_spreaderToken, INDEX_ID);
    }

    // just for now using the below function for registering the validate student addresses
    function registerStudent() public {
        validStudents[msg.sender] = true;
    }

    // contain all the streams 
    // probably with current approach is managing funds among institutes we don't need streams
    function addStreams(string memory _streamCode) fundsOwnerCheck public  {
        //adding streams to the institute.
        bytes memory _streamCodeLength = bytes(_streamCode); // Uses memor
        require(_streamCodeLength.length != 0, "Stream code can't be an empty string");
        // streamBalance[_streamCode] = 0;
        allStreams.push(_streamCode);
    }

    // any fund send to the below function will be here in this contract itself 
    function depositFundsToStream(uint256 _noOfTokens) public {
        // deposit shouldn't be done with zero fund 
        require(_noOfTokens != 0, "Can't deposit zero token");
        // no of token should be greater than 2 
        require(_noOfTokens == 2, "Not equal no of tokens to advertise");
        // the balance should get updated in the contract account first
        // also the upgrade should only be increment by 2 
        uint256 _updatedBalance = accountBalance + 2;
        // diluting the security for checking functionality
        // require(DaiXContract.balanceOf(address(this)) == _updatedBalance * 1000000000000000000, "Balance hasn't updated yet");
        // incase the balance updated in account update it here as well 
        accountBalance = accountBalance + _noOfTokens;
        oldAccountBalance = accountBalance;
    }

   /**
     * for now we are not focusing in classifiying the funds based on institute streams as well 
     * the classification of funds is only according to institute right now
    **/

    // function transferFundsToDistribute(string memory _streamCode) public {
    //     require(streamBalance[_streamCode] > 0, "Doesn't matter stream don't get funds");
    //     // transfering contract token to distributor contract and then we will call the distribute function from gelato
    //     DaiXContract.transfer(distributorAddress, streamBalance[_streamCode]);
    //     streamBalance[_streamCode] = 0;
    //     oldStreamBalance[_streamCode] = 0;
    // }

    function getContractBalance() public view returns(uint256) {
        return DaiXContract.balanceOf(address(this));
    }

    // not maintaining getStream funds RN as not required

    // function getStreamFunds(string memory _streamCode) public view returns(uint256) {
    //     return streamBalance[_streamCode];
    // }

    // this method is just for testing purpose
    function redeemToken(uint256 _amount) public {
        DaiXContract.transfer(msg.sender, _amount * 1000000000000000000);
    }

    // modules for now is visible to all users
    function addModule(uint256 _noOfModules, uint256 _noOfTokens) public {
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
        require(validStudents[msg.sender] == true, "Probably you are not a student");
        require(moduleCount >= 1, "No more rewarding modules availaible");
        moduleCount = moduleCount - 1;
        // change the transfer amount to 2 tokens only 
        DaiXContract.transfer(msg.sender, 1000000000000000000 * 2);
    }

    function getAllStreams() public view returns(string[] memory) {
        return allStreams;
    }

    function getModuleCount() public view returns (uint256) {
        return moduleCount;
    }

    // below are mostly superfluid methods
    // removed onlyOwner and diluted the security for now 
    function distribute() public {
        uint256 spreaderTokenBalance = spreaderToken.balanceOf(address(this));
        (uint256 actualDistributionAmount,) = idaV1.ida.calculateDistribution(
            spreaderToken,
            address(this),
            INDEX_ID,
            spreaderTokenBalance
        );
        idaV1.distribute(spreaderToken, INDEX_ID, actualDistributionAmount);
    }

    function gainShare(address subscriber, uint units) public {
        (,,uint256 currentUnitsHeld,) = idaV1.getSubscription(
            spreaderToken,
            address(this),
            INDEX_ID,
            subscriber
        );
        idaV1.updateSubscriptionUnits(
            spreaderToken,
            INDEX_ID,
            subscriber,
            uint128(currentUnitsHeld + units)
        );
        shareUnits[subscriber] = uint128(currentUnitsHeld + units);
    }
    
    function loseShare(address subscriber, uint units) public {

        (,,uint256 currentUnitsHeld,) = idaV1.getSubscription(
            spreaderToken,
            address(this),
            INDEX_ID,
            subscriber
        );

        idaV1.updateSubscriptionUnits(
            spreaderToken,
            INDEX_ID,
            subscriber,
            uint128(currentUnitsHeld - units)
        );
        shareUnits[subscriber] = uint128(currentUnitsHeld - units);
    }

    function deleteShares(address subscriber) public {

        idaV1.deleteSubscription(
            spreaderToken,
            address(this),
            INDEX_ID,
            subscriber
        );
        shareUnits[subscriber] = 0;
    }

    function approveSubscriptionForSubscriber(address publisher) public {
         idaV1.approveSubscription(spreaderToken, publisher, INDEX_ID);
    }
}