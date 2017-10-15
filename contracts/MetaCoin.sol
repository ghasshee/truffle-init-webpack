pragma solidity ^0.4.2;

contract MetaCoin {

    bytes32[] works;

    function pushAWork(bytes32 docID) {
        works.push(docID);
    }

    function listWorks() returns (bytes32[]) {
        return works;
    }
}
