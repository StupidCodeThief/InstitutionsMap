import React from "react";

import { Input } from "antd";

import { findPlace } from "../../../utils/search/findPlaces";

function Search() {
  const { Search } = Input;

  const onSearch = (value) => {
    findPlace(value);
  };

  return (
    <>
      <Search placeholder="Find places" onSearch={(value) => onSearch(value)} enterButton />
    </>
  );
}

export default Search;
