// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

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

contract DistributeToken {

    ISuperToken public spreaderToken;                  // Token to be distributed to unit holders by distribute() function

    using IDAv1Library for IDAv1Library.InitData;      // Creating idaV1 object for easy use of IDA functions
    IDAv1Library.InitData public idaV1;

    uint32 public constant INDEX_ID = 0;               // The IDA Index. Since this contract will only use one index, we'll hardcode it to "0".
    mapping(address => uint128) public shareUnits;
    address public owner = 0xc1C6805B857Bef1f412519C4A842522431aFed39; 

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        ISuperfluid _host,
        ISuperToken _spreaderToken
    ) {

        require(address(_host) == _spreaderToken.getHost(),"!superToken");


        spreaderToken = _spreaderToken;

        idaV1 = IDAv1Library.InitData(
            _host,
            IInstantDistributionAgreementV1(
                address(_host.getAgreementClass(keccak256("org.superfluid-finance.agreements.InstantDistributionAgreement.v1")))
            )
        );

        idaV1.createIndex(_spreaderToken, INDEX_ID);

    }

    function distribute() public onlyOwner {

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
}