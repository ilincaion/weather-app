import Image from 'next/image';

type Props = {
    name: string;
    temp: number;
    description: string;
    icon: string;
    selectedUnit: 'metric' | 'imperial';
  };
  
  const CurrentWeather: React.FC<Props> = ({ name, temp, description, icon, selectedUnit }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
    return (
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
              Current Weather in {name}
            </h2>
            <Image
              src={iconUrl}
              alt="weather"
              width={100}
              height={100}
              className="mx-auto"
            />
            <p className="capitalize text-lg">
              {description}
            </p>
            <p className="text-xl font-medium text-teal-800">
              {temp} {selectedUnit === 'metric' ? '°C' : '°F'}
            </p>
      </div>
    );
  };
  
  export default CurrentWeather;