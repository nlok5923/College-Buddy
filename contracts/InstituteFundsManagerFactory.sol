pragma solidity >0.4.23 <0.9.0;
import "./InstituteFundsManager.sol";

contract InstituteFundsManagerFactory {
    struct instituteDetails {
        string name;
        InstituteFundsManager instituteAddress;
        string instituteId;
    }
    
    instituteDetails[] public institutes;

    function addInstitute(string memory _name, string memory _instId) public {
        InstituteFundsManager newInstituteAddress = new InstituteFundsManager(_name);
        institutes.push(instituteDetails(_name, newInstituteAddress, _instId));
    }

    function getALlInstitutesManager() public view returns(instituteDetails[] memory) {
        return institutes;
    }
}