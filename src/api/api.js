const API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = () => {
  // https://jsonplaceholder.typicode.com/users
  return fetch(`${API_URL}/users`, {
    method: "GET",
  }).then((response) => response.json());
};

export const getPosts = () => {
  // https://jsonplaceholder.typicode.com/posts
  return fetch(`${API_URL}/posts`, {
    method: "GET",
  }).then((response) => response.json());
};

// Get a single user
export const getSingleUser = (id) => {
  // https://jsonplaceholder.typicode.com/users/1
  return fetch(`${API_URL}/users/${id}`, {
    method: "GET",
  }).then((response) => response.json());
};

// Get a single post
export const getSinglePost = (id) => {
  // https://jsonplaceholder.typicode.com/posts/1
  return fetch(`${API_URL}/posts/${id}`, {
    method: "GET",
  }).then((response) => response.json());
};

const COUNTRY_URL = "http://worldtimeapi.org/api/timezone";

export const countries = () => {
  return fetch(COUNTRY_URL, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch countries.");
    }
    return response.json();
  });
};

const COUNTRY_CITY_TIME = "http://worldtimeapi.org/api/timezone/:area/:location[/:region]";

export const timezone = (selectedCountry) => {
  const apiUrl = `${COUNTRY_URL}/${selectedCountry}`
  console.log(apiUrl)
  return fetch(apiUrl, {
    method: "GET",
  }).then((response) => response.json());
};
