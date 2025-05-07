import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Forecast = {
  date: string;
  temp: number;
  description: string;
  icon: string;
  selectedUnit: 'metric' | 'imperial';
};

type WeatherData = {
  current: {
    name: string;
    temp: number;
    description: string;
    icon: string;
    selectedUnit: 'metric' | 'imperial';
  };
  forecast: Forecast[];
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | ErrorResponse>
) {
  const { city, unit } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'City is required' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not defined' });
  }

  let selectedUnit: 'metric' | 'imperial' = 'metric';
  if (typeof unit === 'string' && (unit === 'imperial' || unit === 'metric')) {
    selectedUnit = unit;
  }

  try {
    const currentRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${selectedUnit}`
    );

    const currentData = currentRes.data;

    const current = {
      name: currentData.name,
      temp: currentData.main.temp,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      selectedUnit: selectedUnit,
    };

    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${selectedUnit}`
    );

    const forecastData = forecastRes.data.list;
    const forecastMap: Record<string, Forecast> = {};

    for (const entry of forecastData) {
      const date = entry.dt_txt.split(' ')[0];
      const time = entry.dt_txt.split(' ')[1];

      // Choose average time for each day and limit forecast to 3 entries
      if (time === '12:00:00' && Object.keys(forecastMap).length < 3) {
        forecastMap[date] = {
          date: new Date(date).toLocaleString('en-us', {weekday:'long'}),
          temp: entry.main.temp,
          description: entry.weather[0].description,
          icon: entry.weather[0].icon,
          selectedUnit: selectedUnit,
        };
      }
    }

    const forecast = Object.values(forecastMap);
    res.status(200).json({ current, forecast });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
