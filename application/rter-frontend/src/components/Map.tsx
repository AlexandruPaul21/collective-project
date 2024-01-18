import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {useEffect, useMemo, useState} from "react";
import "./Map.css";
const GOOGLE_MAPS_API_KEY = `AIzaSyC1SJWNoMsl0kJCghopMcztI7vh5yIdq1E`;

import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";



const Map = ({lat, lng}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });


  setKey(GOOGLE_MAPS_API_KEY);
  setLanguage("en");
  setRegion("ro");


  //const [lat, setLat] = useState("0");
  //const [lng, setLng] = useState("0");
  //const [center, setCenter] = useState({lat: 0, lng: 0});
 // const [ready, setReady] = useState(false);


  // useEffect(() => {
  //   // Get latitude & longitude from address.
  //   const fetchData = async () => {
  //
  //     await fromAddress("Eiffel Tower")
  //       .then(({results}) => {
  //         setLat(results[0].geometry.location.lat);
  //         setLng(results[0].geometry.location.lng);
  //         setCenter({lat, lng});
  //         setReady(true);
  //       })
  //       .catch(console.error);
  //   }
  //   fetchData();
  // }, []);




  console.log("RESULT:> ", lat, lng);

  const center = useMemo(() =>
    ({ lat, lng }), []);



  return (
    <div className="map" >
      <p>Lat: {lat}</p>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={12}
        >
          <Marker
            position={center}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;