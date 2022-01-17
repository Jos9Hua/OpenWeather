import React, { useState } from "react";
import Header from "./components/Header";
import WeatherInput from "./components/WeatherInput";
import WeatherCard from "./components/WeatherCard";
import { Box, Grid, Typography, Divider } from "@mui/material";
import "./App.css";

interface Itemp {
  [key: string]: number;
}

interface Iweather {
  temp: Itemp;
  humidity: number;
  dt: number;
}

type IweatherList = Iweather[];

function App() {
  const [weatherData, setWeatherData] = useState<IweatherList | undefined>();
  const [address, setAddress] = useState<string>("");
  const MDN = ["morn", "day", "night"];
  const getLowest = () => {
    let lowest = 100;
    if (weatherData) {
      weatherData.forEach((day) => {
        MDN.forEach((key) => {
          if (Math.floor(day.temp[key]) < lowest) {
            lowest = Math.floor(day.temp[key]);
          }
        });
      });
      return lowest;
    }
  };

  const getHighest = () => {
    let highest = -100;

    if (weatherData) {
      weatherData.forEach((day) => {
        MDN.forEach((key) => {
          if (Math.floor(day.temp[key]) > highest) {
            highest = Math.floor(day.temp[key]);
          }
        });
      });
      return highest;
    }
  };

  const getMean = () => {
    let mean = 0;
    let number = 0;

    if (weatherData) {
      weatherData.forEach((day) => {
        MDN.forEach((key) => {
          mean += Math.floor(day.temp[key]);
          number++;
        });
      });
      return mean / number;
    }
  };

  const getMode = () => {
    let counter: { [key: number | string]: number } = {};

    if (weatherData) {
      weatherData.forEach((day) => {
        MDN.forEach((key) => {
          if (!counter[Math.floor(day.temp[key])]) {
            counter[Math.floor(day.temp[key])] = 1;
          } else {
            counter[Math.floor(day.temp[key])]++;
          }
        });
      });
      console.log(counter);
      return Object.keys(counter).reduce((a, b) =>
        counter[a] > counter[b] ? a : b
      );
    }
  };

  return (
    <>
      <Box justifyContent="center" alignItems="center">
        <Header />
        <WeatherInput setWeatherData={setWeatherData} setAddress={setAddress} />
      </Box>
      <Box>
        {address ? (
          <Typography align="center" variant="h5">
            Weather Forecast of {address}
          </Typography>
        ) : (
          ""
        )}
        <Divider />
        <Grid container rowSpacing={4}>
          {!weatherData
            ? ""
            : weatherData.map((element) => {
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <WeatherCard weatherData={element} key={element.dt} />
                  </Grid>
                );
              })}
        </Grid>
      </Box>
      <Box>
        {!weatherData ? (
          ""
        ) : (
          <>
            <Typography>Lowest Temperature: {getLowest()}°C</Typography>
            <Typography>Highest Temperature: {getHighest()}°C</Typography>
            <Typography>Mean Temperature: {getMean()}°C</Typography>
            <Typography>Mode Temperature: {getMode()}°C</Typography>
          </>
        )}
      </Box>
    </>
  );
}

export default App;
