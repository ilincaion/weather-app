type Props = {
    city: string;
    unit: 'metric' | 'imperial';
    onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUnitToggle: () => void;
    onSubmit: () => void;
};

const SearchForm: React.FC<Props> = ({ city, onCityChange, onSubmit,  unit, onUnitToggle }) => (
    <div className="flex gap-2 mb-4">
        <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={onCityChange}
        className="border border-teal-700 bg-green-50 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-400"
        />
        <button
        type="button"
        onClick={onUnitToggle}
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
        >
        {unit === 'metric' ? '°C' : '°F'}
      </button>
        <button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
        >
        Get Weather
        </button>
  </div>
  );
  
  export default SearchForm;