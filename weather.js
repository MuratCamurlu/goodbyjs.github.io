const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".container input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section ul.cities");

localStorage.setItem("tokenKey", "ea9f8036314eb976c178ee911f31c27b");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  const tokenKey = localStorage.getItem("tokenKey");
  const inputValue = input.value;
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;
  try {
    const response = await fetch(url).then((response) => response.json());

    const { main, sys, weather, name } = response;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const cityNameSpans = list.querySelectorAll(".city span");
    const cityNameSpansArray = Array.from(cityNameSpans);
    if (cityNameSpansArray.length > 0) {
      const filteredArray = cityNameSpansArray.filter(
        (span) => span.innerText == name
      );
      if (filteredArray.length > 0) {
        msg.innerText = `${name} şehrini arattınız.Lütfen başka bir şehir adı giriniz.`;
        setTimeout(() => {
          msg.innerText = "";
        }, 5000);
        form.reset();
        return;
      }
    }
    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    createdLi.innerHTML = `
    <h2 class="city-name" data-name="${name}, ${sys.country}">
                                <span>${name}</span>
                                <sup>${sys.country}</sup>
                            </h2>
                            <div class="city-temp">${Math.round(
                              main.temp
                            )}<sup>°C</sup></div>
                            <figure>
                                <img class="city-icon" src="${iconUrl}">
                                <figcaption>${
                                  weather[0].description
                                }</figcaption>
                            </figure>
  
`;
    list.prepend(createdLi);
    form.reset();
  } catch (error) {
    msg.innerText = `404 (City Not Found)`;
    setTimeout(() => {
      msg.innerText = "";
    }, 4000);
    form.reset();
  }
};
