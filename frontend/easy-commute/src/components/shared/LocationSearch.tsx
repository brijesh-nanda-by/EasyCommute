// src/components/LocationSearch.tsx
import React, { useState } from 'react';
import { searchLocations, Location } from '../../services/locationService';

interface LocationSearchProps {
  name: string;
  placeholder?: string;
  onSelect: (location: Location) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ name, placeholder, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length > 2) {
      try {
        const results = await searchLocations(newQuery);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        name={name}
        value={query}
        onChange={handleChange}
        placeholder={placeholder || 'Enter location'}
        autoComplete="off"
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            zIndex: 1000,
            background: '#fff',
            border: '1px solid #ccc',
            width: '100%',
            marginTop: 0,
            padding: 0,
            listStyle: 'none'
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => {
                onSelect(suggestion);
                setQuery(suggestion.display_name);
                setSuggestions([]);
              }}
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
