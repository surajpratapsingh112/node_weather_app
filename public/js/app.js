const formSelector = document.querySelector("form");
const search = document.querySelector("input");
const messageone = document.querySelector("#message1");
const messagetwo = document.querySelector("#message2");

formSelector.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  messageone.textContent = "Loading...";
  messagetwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (responce) => {
      responce.json().then((data) => {
        if (data.error) {
          messageone.textContent = data.error;
        } else {
          messageone.textContent = data.forecast.forecast_City;
          messagetwo.textContent = data.location;
        }
      });
    }
  );
});
