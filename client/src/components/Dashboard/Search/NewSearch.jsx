import React, { useState } from "react";
import usePlacesAutocomplete, { getLatLng, getGeocode } from "use-places-autocomplete";

import { Input, AutoComplete } from "antd";

import { findPlace } from "../../../utils/search/findPlaces";

function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 53.89,
        lng: () => 27.56
      },
      radius: 200 * 1000
    }
  });

  const searchResult = () => {
    status === "OK" &&
      data.map(({ id, description }) => {
        return {
          value: description,
          label: (
            <div
              key={id}
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>Found nothing</span>
              <span>No results</span>
            </div>
          )
        };
      });
  };

  const [options, setOptions] = useState([]);

  const Complete = () => {
    const handleSearch = (value) => {
      setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value) => {
      console.log("onSelect", value);
    };

    return (
      <>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: 300
          }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search
            size="large"
            placeholder="Enter address"
            enterButton
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
          />
        </AutoComplete>
      </>
    );
  };
}

export default Search;
