const API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = () => {
  return fetch(`${API_URL}/users`, {
    method: "GET",
  }).then((response) => response.json());
};

export const getPosts = () => {
  return fetch(`${API_URL}/posts`, {
    method: "GET",
  }).then((response) => response.json());
};


export const getSingleUser = (id) => {
  return fetch(`${API_URL}/users/${id}`, {
    method: "GET",
  }).then((response) => response.json());
};

export const getSinglePost = (id) => {
  return fetch(`${API_URL}/posts/${id}`, {
    method: "GET",
  }).then((response) => response.json());
};

const COUNTRY_URL = "http://worldtimeapi.org/api/timezone";

export const setCountries = () => {
  return fetch(COUNTRY_URL, {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
};

export const setTimezone = (selectedCountry) => {
  const apiUrl = `${COUNTRY_URL}/${selectedCountry}`;
  return fetch(apiUrl, {
    method: "GET",
  }).then((response) => response.json());
};
