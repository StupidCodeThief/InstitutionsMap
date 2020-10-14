import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Comment, Tooltip, Avatar, Rate, Button } from "antd";

import { getPlacesDatabyId } from "../../../actions/places";
import { PLACES_CLEAR } from "../../../actions/types";

import { Container } from "../../app/App.styles";
import { PlaceInfo, PlacePhoto } from "./PlaceDetails.styles";

function PlaceDetails({ match }) {
  const dispatch = useDispatch();

  const isThemeDArk = useSelector((state) => state.uiTheme.darckTheme);
  const map = useSelector((state) => state.places.map);

  useEffect(() => {
    dispatch(getPlacesDatabyId(match.params.id, map));

    return function () {
      dispatch({ type: PLACES_CLEAR });
    };
  }, []);

  const [placeWithData] = useSelector((state) => state.places.placesWithData);

  console.log(placeWithData);

  return (
    <Container
      backgroundColor={isThemeDArk ? "#27292D" : "#ebedf0"}
      style={{ color: isThemeDArk ? "#fff" : "#27292D" }}
    >
      {placeWithData ? (
        <>
          <PlaceInfo>
            <div>
              <h2 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>{placeWithData.name}</h2>
              {placeWithData.rating && (
                <>
                  <b>Google rating:</b> <Rate disabled defaultValue={Math.round(placeWithData.rating)} />{" "}
                </>
              )}
              <p>Adress: {placeWithData.formatted_address}</p>
              <p>
                Tags:{" "}
                {placeWithData.types.length
                  ? placeWithData.types.map((type, index) => <span key={index}>{type} </span>)
                  : null}
              </p>
              {placeWithData.opening_hours?.weekday_text &&
                placeWithData.opening_hours.weekday_text.map((text, index) => <span key={index}>{text} </span>)}
            </div>
            <PlacePhoto src={placeWithData.icon} alt="place photo" />
          </PlaceInfo>
          <h3 style={{ color: isThemeDArk ? "#fff" : "#27292D" }}>Reviews from google:</h3>
          {placeWithData.reviews?.length
            ? placeWithData.reviews.map((review) => (
                <>
                  <Comment
                    key={review.time}
                    author={<a href={review.author_url}>{review.author_name}</a>}
                    avatar={<Avatar src={review.profile_photo_url} alt={review.author_name} />}
                    content={<p>{review.text}</p>}
                    datetime={
                      <Tooltip>
                        <span>{review.relative_time_description}</span>
                      </Tooltip>
                    }
                  />
                </>
              ))
            : "No reviews"}
        </>
      ) : (
        "place details not found!"
      )}
      <span>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/dashboard">Back to map</Link>
        </Button>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/user/profile">Back to profile</Link>
        </Button>
      </span>
    </Container>
  );
}

export default PlaceDetails;
