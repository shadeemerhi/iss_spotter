const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP('222222', (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  });
});




// fetchCoordsByIP('24.64.161.83', (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);
// })