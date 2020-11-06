import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete, StreetViewService } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";

import { MAP_LOADED, MAP_ERROR } from "../../../actions/types";

import { notification, Button } from "antd";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";

import { libraries, mapContainerStyle, getDataById } from "./GoogleMap.service";
import { findCenter, getCenter } from "../../../utils/geolocation/findCurrentLocation";
import { findPlaces } from "../../../utils/search/findPlaces";
import { saveVisitedPlace, deleteVisitedPlace } from "../../../actions/places";

import PreLoading from "../PreLoading/PreLoading";

import { Input } from "./GoogleMap.styles";
import "./googleMap.css";
import { Link } from "react-router-dom";

function Map({ t, isMobile, language }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: language.slice(0, 2),
    libraries
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState({ lat: 53.89, lng: 27.56 });
  const [places, setPlaces] = useState([]);
  const [userInput, setUserInput] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getCenter(setCenter, center);
  }, []);

  const onMapClick = useCallback(async (event) => {
    event.stop();
    let data = null;
    setSelected(null);

    if (event.placeId) {
      data = await getDataById(event.placeId, mapRef.current);
      setSelected({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        place_id: event.placeId,
        name: data?.name,
        address: data?.formatted_address,
        time: new Date()
      });
    }

    setMarkers((markers) => [
      ...markers,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        place_id: event.placeId,
        name: data?.name,
        address: data?.formatted_address,
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
    findPlaces(query, mapRef, setUserInput, setMarkers, setCenter, dispatch);
  };

  const onPlaceChanged = () => {
    if (places[places.length - 1]) {
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
  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
      dispatch({
        type: MAP_LOADED,
        payload: mapRef.current
      });
    },
    [dispatch]
  );

  if (loadError) {
    notification.warning({ message: t("Map is not available now...") });
    dispatch({ type: MAP_ERROR });
    return <></>;
  }

  const google = window.google;
  let options = {};

  if (google) {
    options = {
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
  }

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

  const showInfoWindow = (selected) => {
    return (
      <InfoWindow
        position={{ lat: selected.lat, lng: selected.lng }}
        onCloseClick={() => {
          setSelected(null);
        }}
      >
        <div style={{ color: "black" }}>
          {selected.place_id ? (
            <>
              {selected.name && <h2>{selected.name}</h2>}
              {selected.address && <p>Address: {selected.address}</p>}
              <Button
                className={"ant-btn ant-btn-primary btn"}
                onClick={() => {
                  savePlace(selected.place_id);
                }}
              >
                {t("Mark as visited")}
              </Button>
              <Button className={"ant-btn ant-btn-primary btn"}>
                <Link to={`/place-info/${selected.place_id}`}>{t("View details")}</Link>
              </Button>
              <Button
                className={"btn"}
                onClick={() => {
                  deleteMarker(markers.findIndex((marker) => marker.time === selected.time));
                  setSelected(null);
                }}
              >
                {t("Delete marker")}
              </Button>
            </>
          ) : (
            <>
              <h2>{t("Custom marker")}</h2>
              <p>
                Position: lat: {selected.lat}, lng: {selected.lng}
              </p>
              <Button
                className={"btn"}
                onClick={() => {
                  deleteMarker(markers.findIndex((marker) => marker.time === selected.time));
                  setSelected(null);
                }}
              >
                {t("Delete marker")}
              </Button>
            </>
          )}
        </div>
      </InfoWindow>
    );
  };

  console.log("render");

  return !isLoaded ? (
    <PreLoading />
  ) : (
    <div id="map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={isAuthenticated ? onMapClick : null}
        onLoad={onMapLoad}
      >
        {isAuthenticated ? (
          <>
            <Button
              onClick={() => {
                findCenter(mapRef, setCenter, center);
              }}
              className={"btn-geo ant-btn ant-btn-default"}
              icon={<EnvironmentOutlined />}
              size={"large"}
            ></Button>
            <Button
              onClick={() => {
                placeFinder(userInput);
              }}
              className={isMobile ? "btn-geo-2-mobile ant-btn ant-btn-primary" : "btn-geo-2 ant-btn ant-btn-primary"}
            >
              <SearchOutlined />
              {t("Find!")}
            </Button>
            <Button className={isMobile ? "clear-markers-mobile" : "clear-markers"} onClick={() => setMarkers([])}>
              {t("Clear markers")}
            </Button>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input
                onChange={onChange}
                type="text"
                placeholder={t("Find place!")}
                maxLength={24}
                value={userInput}
                className={isMobile ? "autocomplete-input mobile" : "autocomplete-input desktop"}
              />
            </Autocomplete>
            <StreetViewService />
            {markers.map((marker, index) => (
              <Marker
                onRightClick={() => {
                  deleteMarker(index);
                }}
                onDblClick={() => {
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
        {selected ? showInfoWindow(selected) : null}
      </GoogleMap>
    </div>
  );
}

export default Map;
