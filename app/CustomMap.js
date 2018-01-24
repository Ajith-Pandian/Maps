import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Image
} from "react-native";
import MapView from "react-native-maps";
import { Counter } from "../components/Counter";
import PropTypes from "prop-types";
import { getDeltas, meterToKm, getRouteFromAPI, kmToMeters,GetGeographicalDegrees } from "./Utils";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

const LATITUDE = 12.938;
const LONGITUDE = 77.6101227;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initialState = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};
export class CustomMap extends Component {
  constructor(props) {
    super(props);
    console.log("props");
    console.log(props);
  }

  render() {
    let props = this.props;
    let area = props.area;
    let places = props.places;
    let distances = props.distances;
    let circles = props.distances;
    let routes = props.routes;
    let steps = props.steps;
    let userLocation = props.userLocation;

    return (
      <MapView
        style={styles.map}
        initialRegion={initialState}
        showsUserLocation={true}
        showsScale={true}
        showsCompass={true}
        showsMyLocationButton={true}
        cacheEnabled={true}
        moveOnMarkerPress={true}
        toolbarEnabled={true}
        ref={MapRef => {
          if (MapRef !== null) {
            MapRef.fitToElements(true);
          }
        }}
        onPress={e => this.props.onPress(e)}
      >
        {getMarkers(places, distances, area, props)}
        {getSteps(steps)}
        {getRoutes(routes)}
        {getCircle(userLocation, area)}
      </MapView>
    );
  }
}
const getMarkers = (places, distances, area, props) => {
  let markers = [];
  if (places && places.length > 0 && (distances && distances.length > 0)) {
    places.forEach((place, index) => {
      const { latitude, longitude } = place;
      const currentLocation = { latitude, longitude };
      if (distances[index] <= kmToMeters(area))
        markers.push(
          <MapView.Marker
            coordinate={currentLocation}
            title={`${index}.${place.name}`}
            description={`Distance: ${meterToKm(distances[index])} kms`}
            key={index}
            onPress={e => props.onMarkerSelect(currentLocation)}
          />
        );
    });
  }
  return markers;
};

const getRoutes = route => {
  return (
    <MapView.Polyline
      //key={polyline.id}
      coordinates={route}
      strokeColor="#000"
      geodesic={true}
      fillColor="rgba(255,0,0,0.5)"
      strokeWidth={2}
    />
  );
};
const getSteps = steps => {
  let lines = [];
  if (steps)
    steps.forEach((step, index) => {
      lines.push(
        <MapView.Polyline
          key={100 + index}
          coordinates={step}
          strokeColor="red"
          fillColor="red"
          strokeWidth={4}
        />
      );
    });
  return lines.length > 0 ? lines[0] : lines;
};
const getCircle = (userLocation, area) => {
  if (userLocation.hasOwnProperty("latitude")) {
    const { latitude, longitude } = userLocation;
    const color = "rgba(0, 0, 0, 0.2)";
    return (
      <MapView.Circle
        center={{
          latitude,
          longitude
        }}
        radius={area * 1000}
        fillColor={color}
        strokeColor={color}
      />
    );
  }
};

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    ...StyleSheet.absoluteFillObject
  }
});
