import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { searchLocations } from "../services/weatherApi";
import useDebounce from "../hooks/useDebounce";
import "./LocationSearch.css";

const LocationSearch = () => {
  const { changeLocation } = useWeather();

  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setLocations([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const search = async () => {
      try {
        setLoading(true);

        const results = await searchLocations(
          debouncedQuery.trim(),
          controller.signal,
        );

        setLocations(results);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(error);
        setLocations([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    search();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const handleLocationClick = (location) => {
    changeLocation({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
      admin1: location.admin1,
    });

    setQuery("");
    setLocations([]);
  };

  const clearSearch = () => {
    setQuery("");
    setLocations([]);
  };

  const showResults = debouncedQuery.trim().length >= 2;

  return (
    <div className="location-search">
      <label htmlFor="location-input" className="sr-only">
        Search location
      </label>

      <div className="search-input-wrapper">
        <input
          id="location-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search city..."
          autoComplete="off"
          aria-label="Search for a city"
          aria-autocomplete="list"
          aria-expanded={showResults && locations.length > 0}
        />

        {query && (
          <button
            type="button"
            className="clear-search"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {showResults && (
        <div className="location-results" role="listbox">
          {loading && <div className="search-status">Searching...</div>}

          {!loading && locations.length === 0 && (
            <div className="search-empty">
              <strong>No locations found</strong>

              <span>Try searching for another city.</span>
            </div>
          )}

          {!loading &&
            locations.map((location) => (
              <button
                key={`${location.id}-${location.latitude}`}
                type="button"
                className="location-result"
                onClick={() => handleLocationClick(location)}
                role="option"
              >
                <strong>{location.name}</strong>

                <span>
                  {[location.admin1, location.country]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
