import axios from "axios";

import {
  PLACES_ERROR,
  USERS_LOADED,
  PLACE_DATA_ERROR,
  PLACE_DATA_LOADED,
  PLACES_CLEAR,
  COMMENTS_ERROR,
  COMMENTS_LOADED
} from "./types";

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

      searchData.map((place) => {
        request.placeId = place;

        service.getDetails(request, callback);
      });
    });
  };

  const data = Array.from(
    await promisificatedPlaceDetails(searchData, map)
      .then((res) => {
        return res;
      })
      .catch(() => dispatch({ type: PLACE_DATA_ERROR }))
  );

  console.log(data);

  dispatch({
    type: PLACE_DATA_LOADED,
    payload: data
  });
};

export const getPlacesDatabyId = (searchData, map) => async (dispatch) => {
  const request = {
    placeId: searchData,
    fields: ["formatted_address", "icon", "name", "opening_hours", "photos", "rating", "types", "reviews", "place_id"]
  };

  const google = window.google;
  const service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      dispatch({ type: PLACE_DATA_LOADED, payload: [place] });
    } else {
      dispatch({ type: PLACE_DATA_ERROR });
    }
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

    notification.success({ message: res.data.msg });
  } catch (error) {
    const errors = error.response.data;

    notification.warning({ message: errors.message });

    dispatch({
      type: COMMENTS_ERROR
    });
  }
};

// getDetails before primisification
// const request = {
//   placeId: searchData,
//   fields: ["formatted_address", "icon", "name", "opening_hours", "photos", "rating", "types", "reviews", "place_id"]
// };

// const response = [];
// const google = window.google;
// const service = new google.maps.places.PlacesService(map);

// function callback(place, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     response.push(place);

//     if (searchData.length === response.length) {
//       dispatch({ type: PLACE_DATA_LOADED, payload: response });
//     }
//   } else {
//     dispatch({ type: PLACE_DATA_ERROR });
//   }
// }

// await searchData.map((place) => {
//   request.placeId = place;

//   service.getDetails(request, callback);
// });
