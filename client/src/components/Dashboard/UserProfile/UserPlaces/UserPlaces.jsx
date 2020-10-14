import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Card, Avatar, Select, Rate, Checkbox, notification } from "antd";

import { getPlacesDataArray } from "../../../../actions/places";
import { PLACES_CLEAR } from "../../../../actions/types";

import { DivWithScroll } from "./UserPlaces.styles";

const { Option } = Select;

const { Meta } = Card;

function UserPlaces() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.places.loading);
  const visitedPlaces = useSelector((state) => state.auth.user.visitedPlaces);
  const map = useSelector((state) => state.places.map);
  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);
  const placesWithData = useSelector((state) => state.places.placesWithData);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    dispatch(getPlacesDataArray(visitedPlaces, map));

    // setPlaces(placesWithData);
    return function () {
      dispatch({ type: PLACES_CLEAR });
    };
  }, []);

  if (!places.length) setTimeout(() => setPlaces(placesWithData));
  console.log(places);

  function handleSelect(value) {
    switch (value) {
      case "Name":
        setPlaces([
          ...places.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name === b.name) return 0;
            if (a.name < b.name) return -1;
          })
        ]);
        break;
      case "Rating":
        setPlaces([...places.filter((place) => place.rating).sort((a, b) => b.rating - a.rating)]);
        break;
      default:
        break;
    }
  }

  const getFilteredArray = (arr, event) => {
    if (event.target.checked) {
      const filteredArr = arr.filter((place) => place.types.find((type) => type === event.target.name));
      filteredArr.length
        ? setPlaces(filteredArr)
        : notification.warning({ message: `No places with type ${event.target.name} found!` });
      return;
    }

    setPlaces(placesWithData);
  };

  return (
    <>
      {visitedPlaces.length ? (
        <div style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>
          <h3 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>Visited Places</h3>
          <Select
            placeholder="Sort by"
            style={{ width: 120, marginBottom: "10px", marginRight: "10px" }}
            onChange={handleSelect}
          >
            <Option value="Name">Name</Option>
            <Option value="Rating">Rating</Option>
          </Select>
          <Checkbox
            name="cafe"
            onChange={(e) => getFilteredArray(places, e)}
            style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
          >
            Cafe
          </Checkbox>
          <Checkbox
            name="bank"
            onChange={(e) => getFilteredArray(places, e)}
            style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
          >
            Bank
          </Checkbox>
          <Checkbox
            name="gar"
            onChange={(e) => getFilteredArray(places, e)}
            style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
          >
            Bar
          </Checkbox>
          <Checkbox
            name="gym"
            onChange={(e) => getFilteredArray(places, e)}
            style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
          >
            Gym
          </Checkbox>
          <Checkbox
            name="museum"
            onChange={(e) => getFilteredArray(places, e)}
            style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
          >
            Museum
          </Checkbox>
          <Checkbox
            name="all"
            onChange={(e) => setPlaces(placesWithData)}
            style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
          >
            All
          </Checkbox>
        </div>
      ) : (
        <h3>No visited places</h3>
      )}
      <DivWithScroll>
        {loading || placesWithData.length
          ? (places || placesWithData).map((place) => {
              return (
                <Link to={`/place-info/${place.place_id}`} key={place.place_id}>
                  <Card style={{ width: 300, marginBottom: 16, marginRight: 16 }}>
                    <Meta
                      avatar={<Avatar src={place.icon} alt="place image" />}
                      title={`${place.name}`}
                      description={place.formatted_address}
                    />
                    {place.rating && (
                      <Rate disabled defaultValue={Math.round(place.rating)} style={{ marginLeft: "48px" }} />
                    )}
                  </Card>
                </Link>
              );
            })
          : 0}
      </DivWithScroll>
    </>
  );
}

export default UserPlaces;
