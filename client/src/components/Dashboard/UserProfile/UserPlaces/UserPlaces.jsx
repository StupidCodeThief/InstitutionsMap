import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Avatar } from "antd";

import { getPlacesData } from "../../../../actions/places";
import { PLACES_CLEAR } from "../../../../actions/types";

import { DivWithScroll } from "./UserPlaces.styles";

const { Meta } = Card;

function UserPlaces() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.places.loading);
  const visitedPlaces = useSelector((state) => state.auth.user.visitedPlaces);
  const map = useSelector((state) => state.places.map);
  const placesWithData = useSelector((state) => state.places.placesWithData);

  console.log(visitedPlaces.length);

  useEffect(() => {
    visitedPlaces.map((place) => dispatch(getPlacesData(place, map)));

    return function () {
      dispatch({ type: PLACES_CLEAR });
    };
  }, []);

  return (
    <>
      {visitedPlaces.length ? <h3>Visited Places</h3> : <h3>No visited places</h3>}
      <DivWithScroll>
        {loading || visitedPlaces.length
          ? placesWithData.map((place) => {
              return (
                <Card style={{ width: 300, marginBottom: 16 }} key={place.place_id}>
                  <Meta
                    avatar={<Avatar src={place.icon} alt="place image" />}
                    title={`Place ${place.name}`}
                    description={place.formatted_address}
                  />
                </Card>
              );
            })
          : ""}
      </DivWithScroll>
    </>
  );
}

export default UserPlaces;
