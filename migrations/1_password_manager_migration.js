//password_manager_migration.js

const Migrations = artifacts.require("passwordManager");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};