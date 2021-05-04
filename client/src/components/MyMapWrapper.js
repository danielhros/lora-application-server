import React from "react";
import Title from "./Title";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Circle,
} from "react-google-maps";
import mapStyles from "../shared/mapStyles";

function Map({ markers = [], defaultZoom = 15, circles = [] }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={{
        lat: markers[0]?.lat || 49.42172,
        lng: markers[0]?.lng || 18.69529,
      }}
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

      {circles && circles.length > 0
        ? circles.map((circle) => (
            <Circle
              key={`${circle.distance}-${circle.fill} `}
              defaultCenter={{
                lat: markers[0]?.lat || 49.42172,
                lng: markers[0]?.lng || 49.42172,
              }}
              radius={circle.distance}
              options={{
                strokeColor: circle.stroke,
                fillColor: circle.fill,
                fillOpacity: 0.0,
              }}
            />
          ))
        : null}

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

const MyMapWrapper = ({
  markers,
  wrapperStyle,
  defaultZoom,
  title = "Signal radius",
  circles = [],
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginBottom: 50,
        ...wrapperStyle,
      }}
    >
      <Title>{title}</Title>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        markers={markers}
        defaultZoom={defaultZoom}
        circles={circles}
      />
    </div>
  );
};

export default MyMapWrapper;
