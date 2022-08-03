// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./InstituteFundsManager.sol";

contract InstituteFundsManagerFactory {
    struct instituteDetails {
        string name;
        InstituteFundsManager instituteAddress;
        string instituteId;
    }
    
    instituteDetails[] public institutes;

    function addInstitute(
        string memory _name, 
        string memory _instId, 
        address _owner,
        ISuperfluid _host,
        ISuperToken _spreaderToken
        ) public {
        InstituteFundsManager newInstituteAddress = new InstituteFundsManager(_name, _owner, _host, _spreaderToken);
        institutes.push(instituteDetails(_name, newInstituteAddress, _instId));
    }

    function getALlInstitutesManager() public view returns(instituteDetails[] memory) {
        return institutes;
    }
}