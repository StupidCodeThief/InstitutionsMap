import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Card, Avatar } from "antd";

import { LeftSideContainer } from "./Dashboard.styles";

function Dashboard() {
  const { Meta } = Card;
  const places = useSelector((state) => state.places.places);
  const loading = useSelector((state) => state.places.loading);
  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);

  const [placeCount, setPlaceCount] = useState(5);

  const onClick = () => setPlaceCount(placeCount + 5);

  // console.log(places)

  // let url = "";
  // if (places[0]) {
  //   url = places[0].photos[0].getUrl({maxWidth: 32, maxHeight: 32});
  //   console.log(places[0].photos[0].getUrl());
  // }

  return (
    <>
      {!loading || (
        <LeftSideContainer backgroundColor={isThemeDArk ? "#27292D" : "#ebedf0"}>
          {places.length
            ? places.map((place, index) => {
                if (index <= placeCount) {
                  let url = "";

                  if (place.photos) {
                    // url = place.photos[0].getUrl();
                  }

                  return (
                    <Card style={{ width: 300, marginTop: 16 }} key={place.place_id}>
                      <Meta
                        avatar={<Avatar src={url || place.icon} alt="place image" />}
                        title={place.name}
                        description={place.vicinity || place.formatted_address}
                      />
                    </Card>
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
              More results
            </Button>
          )}
        </LeftSideContainer>
      )}
    </>
  );
}

export default Dashboard;
