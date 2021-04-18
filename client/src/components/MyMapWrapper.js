import React from "react";
import Title from "./Title";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "../shared/mapStyles";

function Map({ markers }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 49.42172, lng: 18.69529 }}
      defaultOptions={{
        styles: mapStyles,
        gestureHandling: "cooperative",
        streetViewControl: false,
      }}
    >
      {markers.map((m) => {
        return (
          <Marker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            onClick={() => {
              setSelected(m);
            }}
          />
        );
      })}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ color: "black", padding: 10 }}>
            <span style={{ fontSize: 16 }}>{selected.name}</span>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MyMapWrapper = ({ markers, wrapperStyle }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginBottom: 50,
        ...wrapperStyle,
      }}
    >
      <Title>Signal radius</Title>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        markers={markers}
      />
    </div>
  );
};

export default MyMapWrapper;