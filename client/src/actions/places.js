import axios from "axios";

import {
  PLACES_ERROR,
  USERS_LOADED,
  PLACE_DATA_ERROR,
  PLACE_DATA_LOADED,
  PLACES_DATA_LOADED,
  COMMENTS_ERROR,
  COMMENTS_LOADED
} from "./types";

import { showNotification } from "../utils/notifications/notification";
import { loadUser } from "./auth";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/users");

    dispatch({
      type: USERS_LOADED,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data;

    showNotification(errors.message, "warning");

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

    showNotification("Place saved", "success");

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    showNotification(errors.message, "warning");

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

    showNotification("Place deleted", "success");

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    showNotification(errors.message, "warning");

    dispatch({
      type: PLACES_ERROR
    });
  }
};

export const getPlacesDataArray = (searchData, map) => async (dispatch) => {
  const promisificatedPlaceDetails = function (searchData, map) {
    return new Promise((resolve, reject) => {
      const request = {
        placeId: searchData,
        fields: [
          "formatted_address",
          "icon",
          "name",
          "opening_hours",
          "photos",
          "rating",
          "types",
          "reviews",
          "place_id"
        ]
      };

      const response = [];
      const google = window.google;
      const service = new google.maps.places.PlacesService(map);

      function callback(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          response.push(place);

          if (searchData.length === response.length) {
            resolve(response);
          }
        } else {
          reject();
        }
      }

      searchData.forEach((place) => {
        request.placeId = place;

        service.getDetails(request, callback);
      });
    });
  };

  try {
    const data = Array.from(
      await promisificatedPlaceDetails(searchData, map)
        .then((res) => {
          return res;
        })
        .catch(() => dispatch({ type: PLACE_DATA_ERROR }))
    );

    dispatch({
      type: PLACES_DATA_LOADED,
      payload: data
    });
  } catch (error) {
    showNotification("Sorry, some error occured", "warning");
  }
};

export const getPlacesDatabyId = (searchData, map) => async (dispatch) => {
  const promisificatedPlaceDetails = function (searchData, map) {
    return new Promise((resolve, reject) => {
      const request = {
        placeId: searchData,
        fields: [
          "formatted_address",
          "icon",
          "name",
          "opening_hours",
          "photos",
          "rating",
          "types",
          "reviews",
          "place_id"
        ]
      };

      const google = window.google;
      const service = new google.maps.places.PlacesService(map);

      function callback(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject();
        }
      }

      service.getDetails(request, callback);
    });
  };

  try {
    const data = await promisificatedPlaceDetails(searchData, map)
      .then((res) => {
        return res;
      })
      .catch(() => dispatch({ type: PLACE_DATA_ERROR }));

    dispatch({
      type: PLACE_DATA_LOADED,
      payload: data
    });
  } catch (error) {
    showNotification("Sorry, some error occured", "warning");
  }
};

export const getComments = (placeId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/places/get-comments/${placeId}`);

    dispatch({
      type: COMMENTS_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COMMENTS_ERROR
    });
  }
};

export const addComment = (placeId, comment) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ placeId, comment });

    const res = await axios.patch(`/api/places/add-comment`, body, config);

    showNotification(res.data.msg, "success");
  } catch (error) {
    const errors = error.response.data;

    showNotification(errors.message, "warning");

    dispatch({
      type: COMMENTS_ERROR
    });
  }
};
