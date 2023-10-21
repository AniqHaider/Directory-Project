import { useState, useEffect } from "react";
import { setTimezone, setCountries } from "../api/api";
import Timezone from "./Timezone";

const CountryDropdown = () => {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Africa/Algiers");
  const [countryTime, setCountryTime] = useState("");
  const [rawOffset, setRawOffset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCountries()
      .then((data) => {
        setCountryList(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleCountryChange({ target: { value: selectedCountry } });
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    const selected = event.target.value;
    setSelectedCountry(selected);

    if (selected) {
      setTimezone(selected)
        .then((data) => {
          if (data.datetime && data.raw_offset) {
            setCountryTime(data.datetime);
            setRawOffset(data.raw_offset);
          } else {
            console.error("Invalid API response:", data);
            setError(new Error("Invalid API response"));
          }
        })
        .catch((error) => {
          console.error("Error fetching timezone:", error);
          setError(error);
        });
    } else {
      setCountryTime("");
      setRawOffset(null);
    }

  };
  if (loading) {
    return <p>Loading...</p>;
  }
  if(error){
    return <p>{error.message}</p>
  }
  return (
    <div className="flex flex-col gap-2 md:flex md:justify-between md:gap-2 md:flex-row">
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className="border border-black rounded-lg dark:bg-blue-200 hover:bg-blue-400 py-1 px-2 sm:py-2 sm:px-4 sm:w-[1/2] w-full"
      >
        <option value="">Select a country</option>
        {countryList.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {countryTime && rawOffset !== null && (
        <Timezone countryTime={countryTime} rawOffset={rawOffset} />
      )}
    </div>
  );
};

export default CountryDropdown;
