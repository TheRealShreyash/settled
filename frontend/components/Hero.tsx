import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { STATE_CITY_MAP } from "constants/locations";

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
  availableStates: string[];
  availableCities: string[];
}

export interface SearchFilters {
  state: string;
  city: string;
  priceRange: [number, number];
}

export default function Hero({
  onSearch,
  availableStates,
  availableCities,
}: HeroProps) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50_000]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState) {
      const cities = STATE_CITY_MAP[selectedState] || [];
      setFilteredCities(cities);
    } else {
      setFilteredCities([]); // Reset if "All States" is picked
    }
  }, [selectedState]);

  const handleSearch = () => {
    onSearch({
      state: selectedState,
      city: selectedCity,
      priceRange,
    });
  };

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find your next <span className="text-emerald-400">sanctuary</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Discover luxury properties tailored to your lifestyle
        </p>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-2 text-left">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity("");
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                <option value="" className="bg-gray-900">
                  All States
                </option>
                {availableStates.map((state) => (
                  <option key={state} value={state} className="bg-gray-900">
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-2 text-left">
                City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                <option value="" className="bg-gray-900">
                  All Cities
                </option>
                {filteredCities.map((city) => (
                  <option key={city} value={city} className="bg-gray-900">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-2 text-left">
                Max Price: ₹ {priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider mt-3"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Search Properties
          </button>
        </div>
      </div>
    </section>
  );
}
