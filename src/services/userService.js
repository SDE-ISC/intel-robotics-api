//const AD = require('ad');
const ldap = require('ldapjs');
const AD = require('ad');
require('dotenv').config();

// Authenticate user
const authenticateUser = async (username, password) => {

  console.log("Url: ", process.env.LDAP_URL);
  console.log("User: ", process.env.LDAP_USER);
  console.log("Pass: ", process.env.LDAP_PASS);

  // Connect to the LDAP server
  const ad = new AD({
    url: process.env.LDAP_URL,
    user: process.env.LDAP_USER,
    pass: process.env.LDAP_PASS});

    return ad.user(username).authenticate(password);

};

module.exports = { authenticateUser };
