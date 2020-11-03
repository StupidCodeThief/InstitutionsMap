import { notification } from "antd";

export const findCenter = (mapRef, setCenter, center) => {
  const map = mapRef.current;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({ ...center, lat: position.coords.latitude, lng: position.coords.longitude });
    });
  } else {
    console.log("Navigator is not available now!");
    notification.warning({ message: "You need to allow geolocation for the application to work correctly" });
  }

  map.setCenter(center);
};

export const getCenter = (setCenter, center) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({ ...center, lat: position.coords.latitude, lng: position.coords.longitude });
    });
  } else {
    notification.warning({ message: "You need to allow geolocation for the application to work correctly" });
  }
};
