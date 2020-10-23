export const libraries = ["places"];

export const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
};

export const getDataById = async (searchData, map) => {
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

  const data = await promisificatedPlaceDetails(searchData, map)
    .then((res) => {
      return res;
    })
    .catch(() => console.log("Error"));

  return data;
};
