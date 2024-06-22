let countryInput = document.querySelector(".country input");
let cityInput = document.querySelector(".city input");
let dateInput = document.querySelector(".date input");
let submitInput = document.querySelector(".submit input");
let currentCountry = document.querySelector(".currentLocation span.country");
let currentCity = document.querySelector(".currentLocation span.city");
let currentDate = document.querySelector(".current-date span.date");
let currentDay = document.querySelector(".current-date span.day");
let time1 = document.querySelector(".timings .value-1");
let time2 = document.querySelector(".timings .value-2");
let time3 = document.querySelector(".timings .value-3");
let time4 = document.querySelector(".timings .value-4");
let time5 = document.querySelector(".timings .value-5");
let time6 = document.querySelector(".timings .value-6");

getDate("Egypt", "Sohag", getCurrntDate());

currentCountry.innerHTML = "Egypt";
currentCity.innerHTML = "Sohag";

submitInput.addEventListener("click", () => {
  if (
    countryInput.value != "" &&
    cityInput.value != "" &&
    dateInput.value != ""
  ) {
    getDate(countryInput.value, cityInput.value, dateInput.value);
  }
});

function getDate(country, city, date) {
  let year = Number(date.slice(0, 4));
  let month = Number(date.slice(5, 7));
  let day = Number(date.slice(8, 10));
  fetch(
      `http://api.aladhan.com/v1/calendarByCity?method=4&year=${year}&month=${month}&city=${city}&country=${country}`
    )
    .then((response) => {
      setData(response.data.data[day - 1]);
      currentCountry.innerHTML = country;
      currentCity.innerHTML = city;
    })
    .catch((error) => alert("Error: Can't Finde Location"));
}
function handleTime(str) {
  let index = str.indexOf(" (");
  let time = str.substring(0, index).trim();
  let [hour, minute] = time.split(":").map(Number);

  if (hour < 12) {
    return time + " AM";
  } else {
    if (hour > 12) {
      hour -= 12;
    }
    return (
      hour.toString().padStart(2, "0") +
      ":" +
      minute.toString().padStart(2, "0") +
      " PM"
    );
  }
}

function setData(data) {
  console.log(data);
  let Fajr = handleTime(data.timings.Fajr);
  let Sunrise = handleTime(data.timings.Sunrise);
  let Dhuhr = handleTime(data.timings.Dhuhr);
  let Asr = handleTime(data.timings.Asr);
  let Maghrib = handleTime(data.timings.Maghrib);
  let Isha = handleTime(data.timings.Isha);

  currentDate.innerHTML = data.date.readable;
  currentDay.innerHTML = data.date.hijri.weekday.ar;
  time1.innerHTML = Fajr;
  time2.innerHTML = Sunrise;
  time3.innerHTML = Dhuhr;
  time4.innerHTML = Asr;
  time5.innerHTML = Maghrib;
  time6.innerHTML = Isha;
}

function getCurrntDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  let day = currentDate.getDate();

  month = month.toString().padStart(2, "0");
  day = day.toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}
