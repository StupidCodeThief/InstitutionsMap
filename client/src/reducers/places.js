import {
  PLACES_ERROR,
  PLACES_LOADED,
  PLACES_CLEAR,
  MAP_LOADED,
  MAP_ERROR,
  PLACE_DATA_ERROR,
  PLACE_DATA_LOADED
} from "../actions/types";

const initialState = {
  places: [],
  placesWithData: [],
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
        places: state.places.concat(payload),
        loading: false
      };
    case PLACE_DATA_LOADED:
      return {
        ...state,
        placesWithData: state.placesWithData.concat(payload),
        loading: false
      };
    case PLACE_DATA_ERROR:
      return {
        ...state,
        placesWithData: [],
        loading: false
      };
    case PLACES_CLEAR:
      return {
        ...state,
        places: [],
        placesWithData: [],
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
