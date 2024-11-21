//const AD = require('ad');
const ldap = require('ldapjs');
const AD = require('ad');

// Authenticate user
const authenticateUser = async (username, password) => {
  // Connect to the LDAP server
  const ad = new AD({
    url: 'ldap://100.102.242.82',
    user: 'administrator@IntelRobotics.test',
    pass: 'NxtGen2024'});

    return ad.user(username).authenticate(password);

};

module.exports = { authenticateUser };
