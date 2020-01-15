export function fetchPopularRepos(topic) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+${topic}&sort=stars&order=desc&type=Repositories`
  );
  // use fetch to make a request
  return fetch(endpoint)
    .then(httpResponse => httpResponse.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
