const fetch = require('node-fetch');
let userData = null;
let token = null;
let header = {
    headers: {
        authorization: `token ${token} `
    }
}
module.exports.setToken = (userToken) => {
    token = userToken;
    header = {
        headers: {
            authorization: `token ${token} `
        }
    }
}
module.exports.userdata = async (username) => {
    if (token) {
        const data = await Promise.all([
            basicData(username), userFollowing(username), userFollower(username), userRepo(username)
        ]);
        return data;
    } else {
        console.log('no token');

    }

    // setAuth('', '');
}
const basicData = async (username) => {
    const url = `https://api.github.com/users/${username}`;
    const sample = await fetch(url, header)
        .then((data) => data.json())
        .then(user => user);
    return sample;
}
const userFollowing = (username) => {

    const followingUrl = `https://api.github.com/users/${username}/following`;
    const sample = fetch(followingUrl, header)
        .then(data => data.json())
        .then(user => user);
    return sample;
}

const userFollower = (username) => {

    const followingUrl = `https://api.github.com/users/${username}/followers`;
    const sample = fetch(followingUrl, header)
        .then(data => data.json())
        .then(user => user);
    return sample;
}
const userRepo = (username) => {

    const followingUrl = `https://api.github.com/users/${username}/repos`;
    const sample = fetch(followingUrl, header)
        .then(data => data.json())
        .then(user => user);
    return sample;
}
async function setAuth() {
    const response = await fetch(
        "https://api.github.com/repos/octokit/core.js/releases/latest",
        {
            headers: {
                authorization: "token 774420d34e6ce265cbc10812ca2f02042126157e "
            }
        }
    )
    console.log(await response.json());
}

