import { useState } from 'react';
import Image from 'next/image'
import SearchForm from '@/components/SearchForm';
import CurrentWeatherPanel from '@/components/CurrentWeatherPanel';
import ForecastPanel from '@/components/ForecastPanel';

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

export default function Home() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    // add delay to showcase loading animation
    await new Promise(r => setTimeout(r, 1000)); // this is silly
    try {
      setError('');
      console.log(unit);
      const res = await fetch(`/api/weather?city=${city}&unit=${unit}`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error || 'Error fetching data');
        setWeather(null);
      }
    } catch {
      setError('Error fetching data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="text-black min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-white px-4">
        <h1 className="text-3xl font-bold mb-6 text-teal-700">Weather Forecast</h1>
        <SearchForm
          city={city}
          onCityChange={(e) => setCity(e.target.value)}
          unit={unit}
          onUnitToggle={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
          onSubmit={fetchWeather}
        />
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-10 w-10 border-y-4 border-teal-600"></div>
          </div>
        )}
        {error && (
          <div className="text-center mt-6 bg-green-200 rounded-xl shadow-md p-8 w-2/3">
            <p className="text-red-500 mb-4">{error}</p>
            <Image alt="weather" className="mx-auto" width={150} height={150} src="https://openweathermap.org/img/wn/11d@2x.png"/>
          </div>
        )}
        {!loading && weather && (
           <div className="text-center mt-6 bg-green-200 rounded-xl shadow-md p-8 w-2/3">
            <CurrentWeatherPanel {...weather.current} />
            <ForecastPanel forecast={weather.forecast} /> 
          </div>
        )}
      </main>
  );
}
