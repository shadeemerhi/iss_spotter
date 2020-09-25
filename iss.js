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
      const msg = `Status Code ${response.statusCode} when fetching COORDINATES. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const results = JSON.parse(body);
    const lat = results.data.latitude;
    const lon = results.data.longitude;
    callback(null, {"lat" : lat, "lon": lon});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.lat;
  const lon = coords.lon;
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching PASS TIMES. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const results = JSON.parse(body);
    callback(null, results.response);
  });
};



// Callback Waterfall
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
      return;
    }
    // console.log('It worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        callback(error);
        return;
      }
      // console.log(data);
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          callback(error);
          return;
        }
        callback(null, data);
      });
    });
  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };