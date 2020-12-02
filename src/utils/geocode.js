const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
    encodeURIComponent(${address}).json?access_token=pk.eyJ1Ijoic3VyYWpwcmF0YXBzaW5naDExMSIsImEiOiJja2hhOTBpY20xMnZtMnltbTBlbnJ6OW1nIn0.MV7hOpyEew7nvFPFiexayw&limit=1`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the server", undefined);
    } else if (body.features.length === 0) {
      callback("Could not found the location... Please try again", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
