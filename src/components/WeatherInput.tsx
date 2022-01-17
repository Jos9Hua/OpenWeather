import React from "react";
import { TextField, Button, Stack } from "@mui/material";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDt36yzh2EPRP705UOQzl5_T6C0NB_o82c");

export default function WeatherInput({
  setWeatherData,
  setAddress,
}: {
  setWeatherData: any;
  setAddress: any;
}) {
  const [input, setInput] = React.useState("");

  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    Geocode.fromAddress(input)
      .then((response) => {
        const coords: { lat: number; lng: number } =
          response.results[0].geometry.location;
        setAddress(response.results[0].formatted_address);
        return coords;
      })
      .then((coords) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=2b05a14f4b297dc772f05fa23135e3a8`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeatherData(data.daily);
          });
      });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        id="outlined-basic"
        label="City Name"
        variant="outlined"
        onChange={handleInput}
      />
      <Button
        sx={{ margin: "auto" }}
        variant="contained"
        onClick={handleSubmit}
      >
        Get Weather
      </Button>
    </Stack>
  );
}
