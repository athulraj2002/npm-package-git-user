const fetch = require('node-fetch');
const fs = require("fs");
let header;
/**
 * Function to set user token to a json file
 */
module.exports.setToken = (userToken) => {
    var token = {
        userToken
    };
    fs.writeFileSync("token.json", JSON.stringify(token));
}

/**
 * Function to get user data
 * @param username username entered by user to find data
 */
module.exports.userAllData = async (username) => {
    header =  await setHeader();
    if (istoken()) {
        try {
            const data = await Promise.all([
                basicData(username), userFollowing(username), userFollower(username), userRepo(username)
            ]);
            if (data[0].message) {
                return (`ERROR ${data[0].message}`)
            } else {
                const userData = {
                    user: data[0],
                    followingList: data[1],
                    followerList: data[2],
                    userRepoData: data[3],
                }
                return userData;
            }
        } catch (error) {
            console.log(error);

        }
    } else {
        return 'ERROR: Specify User Token'

    }
}
/**
 * Function to get basic user data
 * @param username username entered by user to find data
 */
module.exports.userbasicData = async (username) => {
    const header =  await setHeader();
    const url = `https://api.github.com/users/${username}`;
    if (istoken()) {
        try {
            const sample = await fetch(url, header)
                .then((data) => data.json())
                .then(user => user);
            return sample;
        } catch (error) {
            return error;
        }
    } else {
        return 'ERROR: Specify User Token'

    }
}
/**
 * Function to get user Following data
 * @param username username entered by user to find data
 */
module.exports.userFollowingList = async (username) => {
    const header =  await setHeader();
    const url = `https://api.github.com/users/${username}/following`;
    if (istoken()) {
        try {
            const sample = await fetch(url, header)
                .then((data) => data.json())
                .then(user => user);
            return sample;
        } catch (error) {
            return error;
        }
    } else {
        return 'ERROR: Specify User Token'

    }
}
/**
 * Function to get user Follower data
 * @param username username entered by user to find data
 */
module.exports.userFollowerList = async (username) => {
   const header =  await setHeader();
    const url = `https://api.github.com/users/${username}/followers`;
    if (istoken()) {
        try {
            const sample = await fetch(url, header)
                .then((data) => data.json())
                .then(user => user);
            return sample;
        } catch (error) {
            return error;
        }
    } else {
        return 'ERROR: Specify User Token'

    }
}
/**
 * Function to get user Repository data
 * @param username username entered by user to find data
 */
module.exports.userRepoList = async (username) => {
    const header =  await setHeader();
    const url = `https://api.github.com/users/${username}/repos`;
    if (istoken()) {
        try {
            const sample = await fetch(url, header)
                .then((data) => data.json())
                .then(user => user);
            return sample;
        } catch (error) {
            return error;
        }
    } else {
        return 'ERROR: Specify User Token'

    }
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
const setHeader = async () => {
    const token = await getToken()
    header = {
        headers: {
            authorization: `token ${token} `
        }
    }
    return header;
}
/**
 * function to get token
 */
const getToken = () => {
    try {
        let data = fs.readFileSync('token.json').toString();
        let usertoken = JSON.parse(data).userToken;
        if (usertoken) return usertoken;
        else return null
    } catch (error) {
        return false
    }

}
/**
 * function to ceck token
 */
function istoken() {
    try {
        let data = fs.readFileSync('token.json').toString();
        let usertoken = JSON.parse(data).userToken;
        if (usertoken) return true
        else return false
    } catch (error) {
        return false
    }

}
