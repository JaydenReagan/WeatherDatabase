//Establish new Vue instance
const app = new Vue({
  el: "#app",
  data: { //Creation of all the data I will need
    message: "Testing 1 2 3 4...",
    zipcode: "",
    measure: "",
    report: {
      temp: "",
      feelsLike: "",
      city: "",
      condition: "",
      imageURL: "",
    },
    errZipOn: false,
    errMeasOn: false,
    weatherOn: false,
  },
  methods: {
    //Function to check that Zipcode is the correct length and a unit oc measurement is selected
    checkForm() { 
      if (this.zipcode.length == 5 && this.measure != "") {
        console.log(this.zipcode);
        console.log(this.measure);
        this.errZipOn = false;
        this.errMeasOn = false;
        this.callWeather();
      }

      //Fail condition for improper zipcode
      if (this.zipcode.length != 5) { 
        this.errZipOn = true;
      } else {
        this.errZipOn = false;
      }

      //Fail condition for not selecting a unit of measurement
      if (this.measure == "") {
        this.errMeasOn = true;
      } else {
        this.errMeasOn = false;
      }
    },
    callWeather() {
      //axios call to get the weather api, pulling the zipcode from user input
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.zipcode}&appid=6aed860eccf8723592f10336c96e9bda`
        )
        .then((response) => { //Assigning values to premade object "report"
          console.log(response);
          console.log(response.data.main.temp);
          if (this.measure == "Celsius") {
            let temp = response.data.main.temp - 273.15;
            temp = temp.toFixed(2);
            console.log(temp + "°C");
            this.report.temp = temp + "°C";

            let feels = response.data.main.feels_like - 273.15;
            feels = feels.toFixed(2);
            console.log(feels + "°C");
            this.report.feelsLike = feels + "°C";
          } else if (this.measure == "Fahrenheit") {
            let temp = ((response.data.main.temp - 273.15) * 9) / 5 + 32;
            temp = temp.toFixed(2);
            console.log(temp + "°F");
            this.report.temp = temp + "°F";

            let feels = ((response.data.main.feels_like - 273.15) * 9) / 5 + 32;
            feels = feels.toFixed(2);
            console.log(feels + "°F");
            this.report.feelsLike = feels + "°F";
          }
          this.report.city = response.data.name;
          this.report.condition = response.data.weather[0].description;
          this.report.imageURL =
            "http://openweathermap.org/img/wn/" +
            response.data.weather[0].icon +
            "@2x.png";
          console.log(this.report);
          this.weatherOn = true;
        })
        .catch((err) => { //Fail condition
          console.log(err);
        });
    },
  },
});
