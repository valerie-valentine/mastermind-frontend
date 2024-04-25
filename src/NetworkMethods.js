import axios from "axios";

const kBaseUrl = `${process.env.REACT_APP_BACKEND_URL}`;

const createGame = (data) => {
  return axios
    .post(`${kBaseUrl}/games`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getIndividualGame = (gameId) => {
  return axios
    .get(`${kBaseUrl}/games/${gameId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAllGames = () => {
  return axios
    .get(`${kBaseUrl}/games`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const postGuessToGame = (gameId, data) => {
  return axios
    .post(`${kBaseUrl}/games/${gameId}/guesses`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

const getAllGuessesForGame = (gameId) => {
  return axios
    .get(`${kBaseUrl}/games/${gameId}/guesses`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteGame = (gameId) => {
  return axios
    .delete(`${kBaseUrl}/games/${gameId}`)
    .then(() => null)
    .catch((error) => {
      console.log(error);
    });
};

const getHint = (gameId) => {
  return axios
    .get(`${kBaseUrl}/games/${gameId}/hint`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createUser = (data) => {
  return axios
    .post(`${kBaseUrl}/clients`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUser = (userId) => {
  return axios
    .get(`${kBaseUrl}/clients/${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAllUserGames = (userId) => {
  return axios
    .get(`${kBaseUrl}/clients/${userId}/games`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteUser = (userId) => {
  return axios
    .delete(`${kBaseUrl}/clients/${userId}`)
    .then(() => null)
    .catch((error) => {
      console.log(error);
    });
};

export {
  kBaseUrl,
  createGame,
  getIndividualGame,
  getAllGames,
  postGuessToGame,
  getAllGuessesForGame,
  deleteGame,
  getHint,
  createUser,
  getUser,
  getAllUserGames,
  deleteUser,
};
