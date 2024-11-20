const ldap = require('ldapjs');

// Create an LDAP client
const client = ldap.createClient({
  url: 'ldap://your-ad-server.com'
});

// Bind (authenticate) to the AD server
client.bind('username', 'password', (err) => {
  if (err) {
    console.error('Error binding to AD:', err);
    return;
  }

  // Define the search options (e.g., search for all users in a specific OU)
  const opts = {
    filter: '(objectClass=user)',
    scope: 'sub',
    attributes: ['dn', 'cn', 'mail'] // Attributes to fetch, e.g., CN, mail
  };

  // Perform the search
  client.search('dc=yourdomain,dc=com', opts, (err, res) => {
    if (err) {
      console.error('Search error:', err);
      return;
    }

    res.on('searchEntry', (entry) => {
      console.log('Found entry:', entry.object);
    });

    res.on('error', (err) => {
      console.error('Search error:', err);
    });

    res.on('end', (result) => {
      console.log('Search finished with status:', result.status);
      client.unbind();
    });
  });
});
