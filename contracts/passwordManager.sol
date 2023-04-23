// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract passwordManager{
    struct Password{
        address user;
        string username;
        string password;
        string details;
    }
    mapping(address=>mapping(string=>Password)) password;

    function addNewPassword(string memory _username, string memory _password, string memory _details) public returns(bool){
        address _user = msg.sender;
        string memory passwordDetails = _details;
        password[_user][passwordDetails].user = msg.sender;
        password[_user][passwordDetails].username = _username;
        password[_user][passwordDetails].password = _password;
        password[_user][passwordDetails].details = passwordDetails;
        return true;
    }

    function fetchPassword(string memory _details) public view returns(string memory){
        string memory fetchedPassword = password[msg.sender][_details].password;
        return fetchedPassword;
    }

    function deletePassword(string memory details) public returns(bool){
        delete password[msg.sender][details];
        return true;
    }
}
