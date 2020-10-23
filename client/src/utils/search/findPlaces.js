import { PLACES_LOADED, PLACES_CLEAR } from "../../actions/types";

import { notification } from "antd";

export const findPlaces = (query, mapRef, setUserInput, setMarkers, setCenter, dispatch) => {
  setUserInput("");
  let service = new window.google.maps.places.PlacesService(mapRef.current);
  const center = mapRef.current.getCenter();

  const request = {
    keyword: query,
    location: center,
    radius: 50000
  };

  const response = [];

  dispatch({ type: PLACES_CLEAR });
  setMarkers([]);

  service.nearbySearch(request, (results, status, pagination) => {
    if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      const request = {
        query,
        fields: ["name", "geometry", "place_id", "formatted_address", "photo"]
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          notification.warning({ message: "No places found, try to change search request" });

          return;
        }

        dispatch({ type: PLACES_LOADED, payload: results });

        results.forEach((place) => {
          setMarkers((markers) => [
            ...markers,
            {
              place_id: place.place_id,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              time: new Date(),
              name: place.name,
              address: place.formatted_address
            }
          ]);
        });

        setCenter({ ...center, lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });

        console.log(results);
      });
    }

    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      response.push(...results);

      results.forEach((place) => {
        setMarkers((markers) => [
          ...markers,
          {
            place_id: place.place_id,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            time: new Date(),
            name: place.name,
            address: place.vicinity
          }
        ]);
      });

      if (pagination.hasNextPage) {
        console.log("Has next page!");
        pagination.nextPage();
      } else {
        setCenter({ ...center, lat: response[0].geometry.location.lat(), lng: response[0].geometry.location.lng() });
      }
    }

    dispatch({ type: PLACES_LOADED, payload: response });
  });
};
