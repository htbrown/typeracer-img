const fetch = require('node-fetch');

module.exports = async (username, options) => {
    if (!username) throw new Error("No username specified.");
    let result = await fetch(`https://data.typeracer.com/users?id=tr:${username}&universe=play`);

    if (result.status === 404) {
        return 404
    } else if (!result.ok) {
        return false
    } else {
        return result.json()
    }
}