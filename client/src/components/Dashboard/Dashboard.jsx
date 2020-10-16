import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Card, Avatar } from "antd";

import { LeftSideContainer } from "./Dashboard.styles";

function Dashboard({ t }) {
  const { Meta } = Card;
  const places = useSelector((state) => state.places.places);
  const loading = useSelector((state) => state.places.loading);

  const [placeCount, setPlaceCount] = useState(5);

  const onClick = () => setPlaceCount(placeCount + 5);

  console.log(typeof t)

  // let url = "";
  // if (places[0]) {
  //   url = places[0].photos[0].getUrl({maxWidth: 32, maxHeight: 32});
  //   console.log(places[0].photos[0].getUrl());
  // }

  return (
    <>
      {places.length && (
        <LeftSideContainer>
          {places.length
            ? places.map((place, index) => {
                if (index <= placeCount) {
                  let url = "";

                  if (place.photos) {
                    // url = place.photos[0].getUrl();
                  }

                  return (
                    <Link to={`/place-info/${place.place_id}`} key={place.place_id}>
                      <Card style={{ width: 300, marginTop: 16 }} >
                        <Meta
                          avatar={<Avatar src={url || place.icon} alt="place image" />}
                          title={place.name}
                          description={place.vicinity || place.formatted_address}
                        />
                      </Card>
                    </Link>
                  );
                }
              })
            : null}
          {places.length >= placeCount && (
            <Button
              onClick={onClick}
              className={"ant-btn ant-btn-primary"}
              style={{
                marginTop: "10px"
              }}
            >
              {t("More results")}
            </Button>
          )}
        </LeftSideContainer>
      )}
    </>
  );
}

export default Dashboard;
