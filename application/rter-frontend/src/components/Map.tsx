import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {useMemo} from "react";
import "./Map.css";
import {GOOGLE_MAPS_API_KEY} from "@/utils/consts";

// Simple map component
const Map = ({lat, lng}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() =>
    ({ lat, lng }), []);

  return (
    <div className="map" >
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={12}
        >
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;