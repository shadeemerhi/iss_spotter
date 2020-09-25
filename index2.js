const { time } = require('console');
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((timeData) => {
    printTimes(timeData);
  })
  .catch((error) => {
    console.log("Something went wrong!", error.message);
  })

const printTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}