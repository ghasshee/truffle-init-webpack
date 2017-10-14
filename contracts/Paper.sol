contract Paper {

    address public owner;

        

    uint256 public id;
    uint256 public paper;
    
    function push(uint256 signature_of_id, uint256 signature_of_paper){
        id = signature_of_id;
        paper = signature_of_paper;
    }

}
