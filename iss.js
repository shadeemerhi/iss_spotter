const request = require('request');


const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}/`, (error, response, body) => {
    // console.log(body);
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const results = JSON.parse(body);
    const lat = results.data.latitude;
    const lon = results.data.longitude;
    callback(null, {"lat" : lat, "lon": lon});
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };