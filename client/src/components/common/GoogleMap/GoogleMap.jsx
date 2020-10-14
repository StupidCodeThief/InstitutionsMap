import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete, StreetViewService } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";

import { PLACES_LOADED, PLACES_CLEAR, MAP_LOADED, MAP_ERROR } from "../../../actions/types";

import { notification, Button } from "antd";

import { libraries, mapContainerStyle } from "./GoogleMap.service";
import { findCenter, getCenter } from "../../../utils/geolocation/findCurrentLocation";
import { saveVisitedPlace, deleteVisitedPlace } from "../../../actions/places";

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState({ lat: 53.89, lng: 27.56 });
  const [places, setPlaces] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [bounds, setBounds] = useState({});

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  getCenter(setCenter, center);

  const onMapClick = useCallback((event) => {
    console.log("Place ID: " + event.placeId);

    setMarkers((markers) => [
      ...markers,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      }
    ]);
  }, []);

  const onLoad = (autocomplete) => {
    setPlaces([...places, autocomplete]);
  };

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const placeFinder = (query) => {
    setUserInput("");
    let service = new google.maps.places.PlacesService(mapRef.current);
    const center = mapRef.current.getCenter();

    const request = {
      keyword: query,
      // rankBy: "DISTANCE", // хз как работает додумать нужно
      location: center,
      radius: 50000
    };

    const response = [];

    dispatch({ type: PLACES_CLEAR });
    setMarkers([]);

    service.nearbySearch(request, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        const request = {
          query,
          fields: ["name", "geometry", "place_id", "formatted_address", "photo"]
        };

        service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            notification.warning({ message: "No places found, try to change search request" });

            return;
          }

          dispatch({ type: PLACES_LOADED, payload: results });

          results.map((place) => {
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

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        response.push(...results);

        results.map((place) => {
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

  const onPlaceChanged = () => {
    if (places[places.length - 1]) {
      console.log(places[places.length - 1].getPlace());
      const place = places[places.length - 1].getPlace();

      if (!place.place_id) {
        console.log("No place ID");

        placeFinder(place.name);
        return;
      }

      setCenter({ ...center, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
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
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    dispatch({
      type: MAP_LOADED,
      payload: mapRef.current
    });
  }, []);

  if (loadError) {
    notification.warning({ message: "Map is not available now..." });
    dispatch({ type: MAP_ERROR });
    return <></>;
  }
  if (!isLoaded) return <div>Loading</div>;

  const google = window.google;
  const options = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControl: isAuthenticated
  };

  const onBoundsChanged = () => {
    const map = mapRef.current;
    const bound = map.getBounds();
    // const centerNow = bound.getCenter()
    setBounds(bound);
    // setCenter({ ...center, centerNow})
  };

  const deleteMarker = (markersIndex) => {
    setMarkers(markers.filter((marker, index) => index !== markersIndex)); // delete marker from state
  };

  const savePlace = (id) => {
    const duplicate = user.visitedPlaces.filter((placeId) => id === placeId);

    if (duplicate.length) {
      dispatch(deleteVisitedPlace(id));
    } else {
      dispatch(saveVisitedPlace(id));
    }
  };

  return (
    <div id="map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={isAuthenticated ? onMapClick : null}
        onLoad={onMapLoad}
        onBoundsChanged={onBoundsChanged}
      >
        {isAuthenticated ? (
          <>
            <Button
              onClick={() => {
                findCenter(mapRef, setCenter, center);
              }}
              className={"btn-geo ant-btn ant-btn-default"}
            >
              Find me!
            </Button>
            <Button
              onClick={() => {
                placeFinder(userInput);
              }}
              className={"btn-geo-2 ant-btn ant-btn-primary"}
            >
              Find place!
            </Button>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                onChange={onChange}
                type="text"
                placeholder="Find place"
                value={userInput}
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `340px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  right: "15px",
                  top: "70px",
                  marginLeft: "-120px"
                }}
              />
            </Autocomplete>
            <StreetViewService />
            {markers.map((marker, index) => (
              <Marker
                onRightClick={() => {
                  deleteMarker(index);
                }}
                key={marker.place_id || marker.time.getMilliseconds()}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{ url: "./marker.svg", scaledSize: new window.google.maps.Size(40, 40) }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))}
          </>
        ) : null}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{"Custom marker" && selected.name}</h2>
              {selected.address && <p>Address: {selected.address}</p>}
              <p>
                Position: lat: {selected.lat}, lng: {selected.lng}
              </p>
              <Button
                className={"ant-btn ant-btn-primary"}
                onClick={() => {
                  savePlace(selected.place_id);
                }}
              >
                Mark as visited
              </Button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default Map;
