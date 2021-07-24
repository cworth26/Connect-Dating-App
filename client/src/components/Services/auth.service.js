const service = require("../../emailconfirmation/controllers/auth.controllers.js");

//this calls the endpoint defined in auth.controllers
const verifyUser = (code) => {
  return axios.get(API_URL + "confirm/" + code).then((response) => {
    return response.data;
  });
};
