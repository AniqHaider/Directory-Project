import React, { useState, useEffect } from "react";
import { timezone, countries } from "../api/api";
import Timezone from "./Timezone";

function CountryDropdown() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryTime, setCountryTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    countries()
      .then((data) => {
        setCountryList(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selected = event.target.value;
    setSelectedCountry(selected);
    console.log("Selected Country:", selected);

    if (selectedCountry) {
      timezone(selectedCountry)
        .then((data) => {
          setCountryTime(data.datetime);
          console.log("Time Data:", data);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setCountryTime("");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex justify-between gap-2">
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className="border border-black rounded-lg dark:bg-blue-300 py-1 px-2 sm:py-2 sm:px-4 sm:w-[1/2] w-full"
      >
        <option value="">Select a country</option>
        {countryList.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {countryTime && <Timezone countryTime={countryTime} />}
    </div>
  );
}

export default CountryDropdown;
