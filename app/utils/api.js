const id = "YOUR_CLIENT_ID";
const secret = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${secret}`;

function getErrorMsg(message, username) {
  // map massge from GitHub to massage that is more user friendly
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }
  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((httpResponse) => httpResponse.json())
    .then((profile) => {
      // if error happens, the message property is gonna have error message
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }
      return profile;
    });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then((httpResponse) => httpResponse.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)])
    .then(([profile, repos]) => ({
      // implicit return an object
      profile,
      score: calculateScore(profile.followers, repos),
    }));
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]).then((userDataSet) => sortPlayers(userDataSet));
}

export function fetchPopularRepos(topic) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+${topic}&sort=stars&order=desc&type=Repositories`
  );
  // use fetch to make a request
  return fetch(endpoint)
    .then((httpResponse) => httpResponse.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
