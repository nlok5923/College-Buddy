pragma solidity >0.4.23 <0.9.0;
import "./InstituteFundsManager.sol";
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

contract InstituteFundsManagerFactory {
    struct instituteDetails {
        string name;
        InstituteFundsManager instituteAddress;
        string instituteId;
    }
    instituteDetails[] public institutes;
    // InstituteFundsManager[] public instituteManagerAddress;
    address public implementationAddress;
    constructor(address _implementationAddress) {
        implementationAddress = _implementationAddress;
    }

    function addInstitute(string memory _name, string memory _instId) public {
        InstituteFundsManager newInstituteAddress = InstituteFundsManager(Clones.clone(implementationAddress));
        newInstituteAddress.initialize(_name);
        institutes.push(instituteDetails(_name, newInstituteAddress, _instId));
    }

    function getALlInstitutesManager() public view returns(instituteDetails[] memory) {
        return institutes;
    }
}