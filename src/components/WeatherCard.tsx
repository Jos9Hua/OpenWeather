import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import Typography from "@mui/material/Typography";

export default function WeatherCard({ weatherData }: { weatherData: any }) {
  console.log(weatherData);
  const [expanded, setExpanded] = React.useState(false);
  let date = new Date(weatherData.dt * 1000);

  return (
    <Card sx={{ maxWidth: 450, margin: "auto" }}>
      <Typography>
        {date.toString().slice(0, 15)}
        <InvertColorsIcon sx={{ verticalAlign: "middle" }} />
        {"Humidity: " + weatherData.humidity}
      </Typography>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <Typography>
              Morning: {Math.floor(weatherData.temp.morn)}°C
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Day: {Math.floor(weatherData.temp.day)}°C</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              Night: {Math.floor(weatherData.temp.night)}°C
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
