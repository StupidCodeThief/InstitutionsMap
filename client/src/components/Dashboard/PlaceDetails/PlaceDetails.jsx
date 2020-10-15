import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { Comment, Tooltip, Avatar, Rate, Button, Form, Input } from "antd";

import { getPlacesDatabyId, getComments, addComment } from "../../../actions/places";
import { PLACES_CLEAR } from "../../../actions/types";

import { Container } from "../../app/App.styles";
import { PlaceInfo, PlacePhoto } from "./PlaceDetails.styles";

const { TextArea } = Input;

function PlaceDetails({ match }) {
  const dispatch = useDispatch();

  const map = useSelector((state) => state.places.map);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getPlacesDatabyId(match.params.id, map));
    dispatch(getComments(match.params.id));

    return function () {
      dispatch({ type: PLACES_CLEAR });
    };
  }, []);

  const [isCommentFormOpen, setCommentFormOpen] = useState(false);
  const [commentData, setCommentData] = useState("");

  const [placeWithData] = useSelector((state) => state.places.placesWithData);
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

  return (
    <Container>
      {placeWithData ? (
        <>
          <PlaceInfo>
            <div>
              <h2>{placeWithData.name}</h2>
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
          <br />
          <h3>Users rewies:</h3>
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
            : "No reviews"}
          {!isCommentFormOpen && (
            <Button className={"ant-btn ant-btn-primary btn"} style={{ width: "150px" }} onClick={onToggle}>
              Leave comment
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
                      Add Comment
                    </Button>
                  </Form.Item>
                </Form>
              }
            />
          )}

          <h3>Reviews from google:</h3>
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
