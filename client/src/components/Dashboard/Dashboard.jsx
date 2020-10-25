import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Card, Avatar } from "antd";

import { LeftSideContainer } from "./Dashboard.styles";

function Dashboard({ t, isMobile }) {
  const { Meta } = Card;
  const places = useSelector((state) => state.places.places);

  const [placeCount, setPlaceCount] = useState(5);

  const onClick = () => setPlaceCount(placeCount + 5);

  return (
    <>
      {places.length && (
        <LeftSideContainer>
          <h1 className={"visually-hidden"}>{t("Search results")}</h1>
          <h2>{t("Search results")}:</h2>
          {places.length
            ? places.map((place, index) => {
                if (index <= placeCount) {
                  let url = "";

                  if (place.photos) {
                    url = place.photos[0].getUrl();
                  }

                  return (
                    <Link to={`/place-info/${place.place_id}`} key={place.place_id}>
                      <Card style={{ width: 300, marginTop: 16 }}>
                        <Meta
                          avatar={<Avatar src={url || place.icon} alt="place image" />}
                          title={place.name}
                          description={place.vicinity || place.formatted_address}
                        />
                      </Card>
                    </Link>
                  );
                } else {
                  return null;
                }
              })
            : null}
          <span>
            {places.length >= placeCount && (
              <Button
                onClick={onClick}
                className={"ant-btn ant-btn-primary btn"}
                style={{
                  marginTop: "10px"
                }}
              >
                {t("More results")}
              </Button>
            )}
            {isMobile && (
              <Button className={"ant-btn ant-btn-primary btn"}>
                <Link to="/">
                  {t("Back to map")}
                </Link>
              </Button>
            )}
          </span>
        </LeftSideContainer>
      )}
    </>
  );
}

export default Dashboard;
