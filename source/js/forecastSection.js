const favoritesAddBtn = document.querySelector('.addfavorite__button');

const favoritesAddImg = document.getElementById('favoritesAddimg');

const cityName = document.querySelector('.title__city');

const forecastName = document.querySelector('.block__today-forecast');

const degreeValue = document.querySelector('.block__today-degree');

const humidityValue = document.querySelector('.block__today-humidity');

const pressureValue = document.querySelector('.block__today-pressure');

const windValue = document.querySelector('.block__today-wind');

const fellsLikeValue = document.querySelector('.block__today-fells');

const imageWeather = document.querySelector('.block__today-image');

const sunriseValue = document.querySelector('.sunrisetitle');

const sunsetValue = document.querySelector('.sunsettitle');

// Добавляем событие мыши при уходе курсора с кнопки добавления избранного.
favoritesAddBtn.addEventListener('mouseout', () => {
  favoritesAddImg.src = 'images/heartAdd.png';
});

// Функция для перевода времени из UNIX.
function Translatingunix(TimeForTranslation) {
  const time = new Date(TimeForTranslation * 1000);

  const hours = time.getHours();

  const minutes = `0${time.getMinutes()}`;

  return `${hours}:${minutes.substr(-2)}`;
}

// Создаем объект погоды.
const weather = {
  apiKey: '37d7407e803931d21a78b0be6f1e8fdb',
  fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  fetchWeatherfiveday(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather(data) {
    const { name } = data;
    const { lon, lat } = data.coord;
    const { icon, description } = data.weather[0];
    // eslint-disable-next-line camelcase
    const { temp, humidity, feels_like, pressure } = data.main;
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys;
    cityName.innerText = name;
    forecastName.innerText = description;
    degreeValue.innerText = `${temp}°`;
    humidityValue.innerText = `Humidity: ${humidity} %`;
    windValue.innerText = `Wind: ${speed} m/s`;
    // eslint-disable-next-line camelcase
    fellsLikeValue.innerText = `Feels like: ${feels_like}°`;
    pressureValue.innerText = `Pressure: ${pressure} mBar`;
    sunriseValue.innerText = `${Translatingunix(sunrise)} AM`;
    sunsetValue.innerText = `${Translatingunix(sunset)} PM`;
    imageWeather.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('.weather__block').classList.remove('loading');
    ymaps.ready(init);

    function init() {
      var map = new ymaps.Map('map', {
        center: [lat, lon],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag'],
      });     
    }
  },
  search() {
    this.fetchWeather(document.querySelector('.input__search').value);
  },
};

// Создаем объект погоды на следубщие дни.
const weatherfivedays = {
  apiKey: '37d7407e803931d21a78b0be6f1e8fdb',
  fetchWeatherfiveday(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        for (i = 0; i < 5; i += 1) {
          document.getElementById(`day${i + 1}Min`).innerHTML = `${Number(data.list[i].main.temp_min).toFixed(
            1,
          )} °`;
        }
        for (i = 0; i < 5; i += 1) {
          document.getElementById(`day${i + 1}Max`).innerHTML = `${Number(data.list[i].main.temp_max).toFixed(
            1,
          )}°`;
        }
        for (i = 0; i < 5; i += 1) {
          document.getElementById(
            `img${i + 1}`,
          ).src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
        }
      });
  },
  search() {
    this.fetchWeatherfiveday(document.querySelector('.input__search').value);
    const d = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    function CheckDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      }
      return day + d.getDay();
    }
    for (i = 0; i < 5; i += 1) {
      document.getElementById(`day${i + 1}`).innerHTML = `${weekday[CheckDay(i)]}`;
    }
  },
};

// Добавляем событие клика мыши по картинке добавления избранного.
favoritesAddBtn.addEventListener('click', () => {
  favoritesAddImg.src = 'images/addFavorit.gif';
  favoritesBlock.insertAdjacentHTML(
    'beforeend',
    `<div class="favorites__block__item">
    <div class="favorites__block__item-header">  
        <button class="favorites__block__item-button">X</button>        
        <p class="favorites__block__item-degree">${degreeValue.textContent}</p>
        <img src="${imageWeather.src}" alt="" class="favorites__image">
    </div>
    <h4 class="favorites__block__item-title">${cityName.textContent}</h4>
    <div class="favorites__block__item-additionally">
        <p class="favorites__block__additionally-item"><span>${humidityValue.textContent}</span><i class="fas fa-tint tint-icon"></i></p>
        <p class="favorites__block__additionally-item"><span>${windValue.textContent}</span><i class="fas fa-wind wind-icon"></i></p>
        <p class="favorites__block__additionally-item"><span>${pressureValue.textContent}</span><i class="fas fa-thermometer-half thermometer-icon"></i></p>
    </div>
  </div>`,
  );
});

// Добавляем событие мыши при клике на кнопку поиска города.
document.querySelector('.button__search').addEventListener('click', () => {
  weather.search();
  weatherfivedays.search();
});

// Добавляем событие клавиш при нажатие Enter на поле ввода города.
document.querySelector('.input__search').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    weather.search();
    weatherfivedays.search();
  }
});

const masMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const masDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentDatetime = new Date();

function zeroFormat(value) {
  let valueName = value;
  if (value < 10) {
    valueName = `0${value}`;
  }
  return valueName;
}

document.querySelector('.title__date').innerText = `${masDay[currentDatetime.getDay()]} ${zeroFormat(
  currentDatetime.getDate(),
)} ${masMonth[currentDatetime.getMonth()]} ${currentDatetime.getFullYear()}`;

window.onload = function () {
  weather.search();
  weatherfivedays.search();
};
