// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PoliceCaseReporter {
    
    enum Status { Registered, Investigating, Closed }
    
    struct CaseReport {
        uint id;
        address complainant;
        string complaintDetails;
        string crimeType; // Theft, Fraud, Assault etc
        Status status;
        uint timestamp;
    }
    
    uint public caseCount = 0;
    mapping(uint => CaseReport) public cases;
    address public admin;
    
    event CaseRegistered(uint id, address complainant, string crimeType, uint timestamp);
    event CaseStatusUpdated(uint id, Status newStatus);
    
    constructor() {
        admin = msg.sender;
    }
    
    // Register new police case
    function registerCase(string memory _details, string memory _crimeType) public {
        caseCount++;
        
        cases[caseCount] = CaseReport(
            caseCount,
            msg.sender,
            _details,
            _crimeType,
            Status.Registered,
            block.timestamp
        );
        
        emit CaseRegistered(caseCount, msg.sender, _crimeType, block.timestamp);
    }
    
    // Update case status (Police/Admin only)
    function updateCaseStatus(uint _id, Status _status) public {
        require(msg.sender == admin, "Only police can update case status");
        require(_id > 0 && _id <= caseCount, "Invalid Case ID");
        
        cases[_id].status = _status;
        emit CaseStatusUpdated(_id, _status);
    }
    
    // Get case details
    function getCase(uint _id) public view returns (
        uint id,
        address complainant,
        string memory complaintDetails,
        string memory crimeType,
        Status status,
        uint timestamp
    ) {
        CaseReport memory c = cases[_id];
        
        return (
            c.id,
            c.complainant,
            c.complaintDetails,
            c.crimeType,
            c.status,
            c.timestamp
        );
    }
}
