const fetchCountry = () => {
  debugger;

  let country = document.getElementById("country").value;
  const url = `https://restcountries.com/v3.1/name/${country}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Wrong:${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};
const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
      <h2>Country can not fetch</h2>`;
};

const renderCountries = (data) => {
  const countryDiv = document.querySelector(".countries");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
  } = data[0];

  countryDiv.innerHTML = `
    <div class="card mx-auto m-5 shadow-lg" style="width: 18rem;">
      <img src="${svg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><i class="fa-solid fa-landmark-flag"></i>${capital}</li>
        <li class="list-group-item"><i class="fa-brands fa-speakap"></i>${Object.values(
          languages
        )}</li>
        <li class="list-group-item"><i class="fa-solid fa-money-bill"></i>${
          Object.values(currencies)[0].name
        }  ${Object.values(currencies)[0].symbol}</li>
      </ul>
      
    </div>
      `;
  country.value = "";
};
