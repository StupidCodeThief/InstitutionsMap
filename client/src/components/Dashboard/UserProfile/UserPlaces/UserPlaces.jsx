import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Card, Avatar, Select, Rate, Checkbox, notification } from "antd";

import { getPlacesDataArray } from "../../../../actions/places";
import { PLACES_CLEAR } from "../../../../actions/types";

import { DivWithScroll } from "./UserPlaces.styles";

const { Option } = Select;

const { Meta } = Card;

function UserPlaces({ t }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const map = useSelector((state) => state.places.map);
  const placesWithData = useSelector((state) => state.places.placesWithData);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (user.visitedPlaces.length) dispatch(getPlacesDataArray(user.visitedPlaces, map));

    return function () {
      dispatch({ type: PLACES_CLEAR });
    };
  }, [user]);

  if (!places.length) setTimeout(() => setPlaces(placesWithData));

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
      {user.visitedPlaces.length ? (
        <div>
          <h3>{t("Visited Places")}:</h3>
          <Select
            placeholder={t("Sort by")}
            style={{ width: 120, marginBottom: "10px", marginRight: "10px" }}
            onChange={handleSelect}
          >
            <Option value="Name">{t("Name")}</Option>
            <Option value="Rating">{t("Rating")}</Option>
          </Select>
          <Checkbox name="cafe" onChange={(e) => getFilteredArray(places, e)}>
            <span className="theme-provider">{t("Cafe")}</span>
          </Checkbox>
          <Checkbox name="bank" onChange={(e) => getFilteredArray(places, e)}>
            <span className="theme-provider">{t("Bank")}</span>
          </Checkbox>
          <Checkbox name="bar" onChange={(e) => getFilteredArray(places, e)}>
            <span className="theme-provider">{t("Bar")}</span>
          </Checkbox>
          <Checkbox name="gym" onChange={(e) => getFilteredArray(places, e)}>
            <span className="theme-provider">{t("Gym")}</span>
          </Checkbox>
          <Checkbox name="museum" onChange={(e) => getFilteredArray(places, e)}>
            <span className="theme-provider">{t("Museum")}</span>
          </Checkbox>
          <Checkbox name="all" onChange={(e) => setPlaces(placesWithData)}>
            <span className="theme-provider">{t("All")}</span>
          </Checkbox>
        </div>
      ) : (
        <h3>{t("No visited places")}</h3>
      )}
      <DivWithScroll>
        {placesWithData.length && user.visitedPlaces.length
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
          : null}
      </DivWithScroll>
    </>
  );
}

export default UserPlaces;
