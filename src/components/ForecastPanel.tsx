import Image from 'next/image';

type Forecast = {
    date: string;
    temp: number;
    description: string;
    icon: string;
    selectedUnit: 'metric' | 'imperial';
  };
  
  type Props = {
    forecast: Forecast[];
  };
  
  const ForecastPanel: React.FC<Props> = ({ forecast }) => {
    const iconUrl = (icon: string) =>
      `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
    <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">3-Day Forecast</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {forecast.map((day) => (
                <div key={day.date} className="bg-emerald-200 rounded-lg p-4 shadow-sm text-center">
                    <p className="font-semibold">{day.date}</p>
                    <Image src={iconUrl(day.icon)} alt="forecast" width={100} height={100} className="mx-auto" />
                    <p className="capitalize">{day.description}</p>
                    <p className="text-teal-800 font-medium"> {day.temp} {day.selectedUnit === 'metric' ? '°C' : '°F'}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ForecastPanel;