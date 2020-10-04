import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Card, Avatar } from "antd";

import { getPlacesData } from "../../../../actions/places";

const { Meta } = Card;

function UserPlaces() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.places.loading);
  const visitedPlaces = useSelector((state) => state.auth.user.visitedPlaces);
  const map = useSelector((state) => state.places.map);
  const placesWithData = useSelector((state) => state.places.placesWithData);

  useEffect(() => {
    visitedPlaces.map((place) => dispatch(getPlacesData(place, map)));
  }, []);

  console.log(placesWithData)

  return (
    <>
      {loading || placesWithData.length
        ? placesWithData.map((place) => {
            return (
              <Card style={{ width: 300, marginTop: 16 }} key={place.place_id}>
                <Meta
                  avatar={<Avatar src={place.icon} alt="place image" />}
                  title={`Place ${place.name}`}
                  description={place.formatted_address}
                />
              </Card>
            );
          })
        : "No visited places"}
    </>
  );
}

export default UserPlaces;
