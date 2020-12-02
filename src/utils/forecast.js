const request = require("request");

const forecast = (long, lati, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=4725aa4023a9f803fe9b8aeb627094e7&units=metric`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (body.message) {
      callback(`${body.message} ... Please try again.", undefined`);
    } else {
      callback(undefined, {
        forecast_City: `The tempereture of the city ${body.name} is ${body.main.temp} Degree Celsius and Visibility is ${body.visibility} and Posbility of rain is ${body.clouds.all} % in ${body.name}`,
        // temp: body.main.temp,
        // visibility: body.visibility,
        // city: body.name,
      });
    }
  });
};

module.exports = forecast;
