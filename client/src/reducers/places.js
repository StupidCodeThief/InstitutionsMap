import {
  PLACES_ERROR,
  PLACES_LOADED,
  PLACES_CLEAR,
  MAP_LOADED,
  MAP_ERROR,
  PLACE_DATA_ERROR,
  PLACE_DATA_LOADED,
  PLACES_DATA_LOADED,
  COMMENTS_ERROR,
  COMMENTS_LOADED
} from "../actions/types";

const initialState = {
  place: null,
  places: [],
  placesWithData: [],
  comments: [],
  map: null,
  loading: true
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case MAP_LOADED:
      return {
        ...state,
        loading: false,
        map: payload
      };
    case PLACES_LOADED:
      return {
        ...state,
        places: [...payload, ...state.places],
        loading: false
      };
    case PLACES_DATA_LOADED:
      return {
        ...state,
        placesWithData: [...state.placesWithData, ...payload],
        loading: false
      };
    case PLACE_DATA_LOADED:
      return {
        ...state,
        place: payload,
        loading: false
      };
    case PLACE_DATA_ERROR:
      return {
        ...state,
        placesWithData: [],
        loading: false
      };
    case COMMENTS_LOADED:
      return {
        ...state,
        comments: [...payload],
        loading: false
      };
    case COMMENTS_ERROR:
      return {
        ...state,
        comments: [],
        loading: false
      };
    case PLACES_CLEAR:
      return {
        ...state,
        places: [],
        placesWithData: [],
        comments: [],
        loading: false
      };
    case PLACES_ERROR:
      return {
        ...state,
        loading: false
      };
    case MAP_ERROR:
      return {
        ...state,
        loading: false,
        map: null
      };
    default:
      return {
        ...state
      };
  }
}
