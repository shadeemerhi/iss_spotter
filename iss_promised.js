const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (body) => {
  return request(`https://ipvigilante.com/json/${JSON.parse(body).ip}/`);
}

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = (callback) => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const response = JSON.parse(data).response;
    return response;
  });
}

module.exports = { nextISSTimesForMyLocation };