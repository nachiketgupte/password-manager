const assert = require('assert');
const passwordManager = artifacts.require('passwordManager');

contract('passwordManager',(accounts)=>{
    const BUYER = accounts[1];

    it('should allow users to store passwords',async ()=>{
        const instance = await passwordManager.deployed();
        // const passowrd = await instacne.addNewPassword('nac','123','fb');
        await instance.addNewPassword('nac','123','fb',{from:BUYER});
    });
});