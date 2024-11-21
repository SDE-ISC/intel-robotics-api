const AD = require('ad');

const ad = new AD({
    url: 'ldap://100.102.242.82',
    user: "administrator@IntelRobotics.test",
    pass: "NxtGen2024"
});

ad.user('Test').authenticate('Lolxd123')
    .then(() => {
        console.log('User authenticated');
    })
    .catch((err) => {
        console.error('Authentication error:', err);
    });