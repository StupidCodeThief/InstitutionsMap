import axios from "axios";

import { PLACES_ERROR, USERS_LOADED, PLACE_DATA_ERROR, PLACE_DATA_LOADED } from "./types";

import { notification } from "antd";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/users");

    dispatch({
      type: USERS_LOADED,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data;

    notification.warning({ message: errors.message });

    dispatch({
      type: PLACES_ERROR
    });
  }
};

export const saveVisitedPlace = (placeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ placeId });

    await axios.patch("/api/places", body, config);

    notification.success({ message: "Place saved" });
  } catch (error) {
    const errors = error.response.data;

    notification.warning({ message: errors.message });

    dispatch({
      type: PLACES_ERROR
    });
  }
};

export const deleteVisitedPlace = (placeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ placeId });

    await axios.patch("/api/places/delete-place", body, config);

    notification.success({ message: "Place deleted" });
  } catch (error) {
    const errors = error.response.data;

    notification.warning({ message: errors.message });

    dispatch({
      type: PLACES_ERROR
    });
  }
};

export const getPlacesData = (searchData, map) => async (dispatch) => {
  const request = {
    placeId: searchData,
    fields: ["name", "rating", "formatted_address", "icon", "photo", "review"]
  };

  // if (window.google) {
  //   console.log("gapi script loaded");
  // }
  
  const google = window.google;
  const service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      dispatch({ type: PLACE_DATA_LOADED, payload: place });
    } else {
      dispatch({ type: PLACE_DATA_ERROR });
    }
  }
};
