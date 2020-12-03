const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config...
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templets/views");
const partialPath = path.join(__dirname, "../templets/partials");

// Setup Handlebar view engine and views folder
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup for static directory
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Neeraj Singh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "A K Verma Ji",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    sub: "For any Query or Help Please contact C B Singh",
    name: "Neeraj Singh",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query.address);
  if (req.query.address === " ") {
    return res.send("You must provide address");
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecast_City) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecast_City,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404Error", {
    message: "Help article not found",
    name: "Neeraj Singh",
    title: "404 Error",
  });
});

app.get("*", (req, res) => {
  res.render("404Error", {
    message: "Page not found",
    name: "Neeraj Singh",
    title: "404 Error",
  });
});

app.listen(port, () => {
  console.log("server is running on port..." + port);
});
