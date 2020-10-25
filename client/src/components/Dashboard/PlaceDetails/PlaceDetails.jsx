import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { Comment, Tooltip, Avatar, Rate, Button, Form, Input } from "antd";

import {
  getPlacesDatabyId,
  getComments,
  addComment,
  saveVisitedPlace,
  deleteVisitedPlace
} from "../../../actions/places";
import { PLACES_CLEAR } from "../../../actions/types";

import { Container } from "../../app/App.styles";
import { PlaceInfo, PlacePhoto, PlaceText } from "./PlaceDetails.styles";

const { TextArea } = Input;

function PlaceDetails({ match, t }) {
  const dispatch = useDispatch();
  const [isVisited, setVisited] = useState();

  const map = useSelector((state) => state.places.map);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getPlacesDatabyId(match.params.id, map));
    dispatch(getComments(match.params.id));

    setVisited(user.visitedPlaces.includes(match.params.id));
    return function () {
      dispatch({ type: PLACES_CLEAR });
    };
  }, [user]);

  const [isCommentFormOpen, setCommentFormOpen] = useState(false);
  const [commentData, setCommentData] = useState("");

  const placeWithData = useSelector((state) => state.places.place);
  const comments = useSelector((state) => state.places.comments);

  const onToggle = () => {
    setCommentFormOpen(!isCommentFormOpen);
    console.log(isCommentFormOpen);
  };

  const onChange = (e) => {
    setCommentData(e.target.value);
  };

  const onSubmit = () => {
    dispatch(addComment(match.params.id, commentData));
    setCommentData("");
    setTimeout(() => dispatch(getComments(match.params.id)), 1000);
  };

  const savePlace = () => {
    isVisited ? dispatch(deleteVisitedPlace(match.params.id)) : dispatch(saveVisitedPlace(match.params.id));
  };

  return (
    <Container>
      <h1 className={"visually-hidden"}>{t("Place`s information")}</h1>
      {placeWithData ? (
        <>
          <PlaceInfo>
            <PlaceText>
              <h2>
                <strong>{placeWithData.name}</strong>
              </h2>
              {placeWithData.rating && (
                <>
                  <strong>{t("Google rating")}:</strong>{" "}
                  <Rate disabled defaultValue={Math.round(placeWithData.rating)} />{" "}
                </>
              )}
              <p>
                <strong> {t("Adress")}:</strong> {placeWithData.formatted_address}
              </p>
              <p>
                <strong>{t("Tags")}:</strong>{" "}
                {placeWithData.types.length
                  ? placeWithData.types.map((type, index) => <span key={index}>{type} </span>)
                  : null}
              </p>
              <p className={"small-text"}>
                {placeWithData.opening_hours?.weekday_text &&
                  placeWithData.opening_hours.weekday_text.map((text, index) => <span key={index}>{text} </span>)}
              </p>
              <Button type="default" onClick={savePlace}>
                {isVisited ? t("Delete from visited") : t("Mark as visited")}
              </Button>
            </PlaceText>

            <PlacePhoto>
              <img src={placeWithData.photos[0].getUrl() || placeWithData.icon} alt={`${placeWithData.name}`} />
            </PlacePhoto>
          </PlaceInfo>
          <br />
          <h3>
            <strong>{t("Users rewies")}:</strong>
          </h3>
          {comments.length
            ? comments.map((comment) => (
                <>
                  <Comment
                    key={comment.date}
                    author={<Link to={`/user/${comment.user}`}>{comment.name}</Link>}
                    avatar={<Avatar src={comment.avatar} alt={comment.name} />}
                    content={<p>{comment.text}</p>}
                    datetime={
                      <Tooltip title={moment(comment.date).format("YYYY-MM-DD HH:mm:ss")}>
                        <span>{moment(comment.date).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </>
              ))
            : t("No reviews")}
          {!isCommentFormOpen && (
            <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }} onClick={onToggle}>
              {t("Leave comment")}
            </Button>
          )}
          {isCommentFormOpen && (
            <Comment
              avatar={<Avatar src={user.avatar} alt={user.userName} />}
              content={
                <Form>
                  <Form.Item>
                    <TextArea rows={4} onChange={onChange} value={commentData} />
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={onSubmit} className={"ant-btn ant-btn-primary btn"}>
                      {t("Add Comment")}
                    </Button>
                  </Form.Item>
                </Form>
              }
            />
          )}

          <h3>
            <strong>{t("Reviews from google")}:</strong>
          </h3>
          {placeWithData.reviews?.length
            ? placeWithData.reviews.map((review) => (
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
              ))
            : t("No reviews")}
        </>
      ) : (
        t("place details not found!")
      )}
      <span>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/dashboard">{t("Back to map")}</Link>
        </Button>
        <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }}>
          <Link to="/user/profile">{t("Back to profile")}</Link>
        </Button>
      </span>
    </Container>
  );
}

export default PlaceDetails;
