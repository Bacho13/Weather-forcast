import { React, useState, useEffect } from "react";
import "./App.css";
import MainDisplay from "./components/MainDisplay";
import { Puff } from "react-loader-spinner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  let API_KEY = "ed231fdeb94150967d13b97a283b9eaa";
  let clear = "/imgs/sunnyDay.png";
  let snowing = "/imgs/snowingDay.png";
  let rainnyDay = "/imgs/rainnyDay.png";
  let cloudyDay = "/imgs/cloudyDay.png";
  let dustyDay = "/imgs/dustyDay.png";
  let mistyDay = "/imgs/mistyDay.png";
  const current = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [numberOfTheMonth, setNumberOfTheMonth] = useState(
    current.getMonth() + 1
  );
  const date = `${current.getDate()} ${
    monthNames[current.getMonth()]
  } ${current.getFullYear()}`;

  const [data, setData] = useState({
    weatherCondition: "clear",
    temperature: "29",
    country: "GE",
    Date: `${date}`,
    city: "Tbilisi",
  });
  const [forcast, setForcast] = useState();
  const [enteredCity, setEnteredCity] = useState();
  const [city, setCity] = useState("Tbilisi");
  const [cityCoord, setCityCoord] = useState({
    lat: 41.6934591,
    lon: 44.8014495,
  });

  const click = () => {

   enteredCity ? setCity(enteredCity) : alert("first need to enter city name");;
  };

  // fetch lat and lon of the city from  API(need to fetch forcast data using lat and lon) .............................
  useEffect(() => {
    const data = fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    ).then((response) => response.json());
    const givenData = Promise.resolve(data);
    givenData.then((value) => {
      setCityCoord({
        lat: value[0].lat,
        lon: value[0].lon,
      });
    });
  }, [city]);

  useEffect(() => {
    console.log(city);
  }, [city]);

  //  we got lat and lon now use tham and get actually forcast of the city
  useEffect(() => {
    const actuallyData = fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${cityCoord.lat}&lon=${cityCoord.lon}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setData(
          {
            weatherCondition: `${response.weather[0].main}`,
            temperature: `${Math.floor(response.main.temp)}`,
            country: `${response.sys.country}`,
            Date: { date },
            city: `${city}`,
          },
          console.log(response)
        );
      });
  }, [cityCoord]);

  // useEffect(() => {
  //   console.log(forcast);
  // }, [forcast]);

  const [backgroundPhoto, setBackgroundPhoto] = useState(clear);
  useEffect(() => {
    switch (data.weatherCondition) {
      case "Clouds":
        setBackgroundPhoto(cloudyDay);
        break;
      case "Clear":
        setBackgroundPhoto(clear);
        break;
      case "Snow":
        setBackgroundPhoto(snowing);
        break;
      case "Rain":
        setBackgroundPhoto(rainnyDay);
        break;
      case "Dust":
        setBackgroundPhoto(dustyDay);
        break;
      case "Mist":
        setBackgroundPhoto(mistyDay);
    }
  }, [data]);

  const handleChange = (e) => {
    setEnteredCity(e.target.value);
  };

  return (
    <div className="App">
      <div className="appContainer">
        <MainDisplay
          imgSrc={backgroundPhoto}
          weatherType={data.weatherCondition}
          temperature={data.temperature}
          city={city}
          country={data.country}
          date={date}
        />
        <div className="inputCity">
          <TextField
            id="outlined-basic"
            label="Enter City"
            variant="outlined"
            type="text"
            name="inputCity"
            onChange={handleChange}
            value={city.value}
            className="input"
            sx={{
              input: {
                color: "white",
                background: "",
                borderRadius: 50,
              }
            }}
          />
          <Button className="button" variant="contained" onClick={click}>
            Get Forcast
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
