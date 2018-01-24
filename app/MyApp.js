import React from "react";
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
import { CustomMap } from "./CustomMap";
import renderIf from "./renderIf";
import { getDeltas, meterToKm, getRouteFromAPI, kmToMeters } from "./Utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getState } from "redux-thunk";
import { fetchPlacesFromAPI } from "../redux/actions/placesActions";
import { increaseArea, decreaseArea } from "../redux/actions/areaActions";
import { fetchUserLocation } from "../redux/actions/userLocationActions";
import { fetchDistances } from "../redux/actions/distanceActions";
import { fetchRoute } from "../redux/actions/routeActions";

const { height, width } = Dimensions.get("window");

const LATITUDE = 12.938;
const LONGITUDE = 77.6101227;
const ASPECT_RATIO = width / height;
let deltas = getDeltas(LATITUDE, 5, ASPECT_RATIO);
const LATITUDE_DELTA = deltas.latitudeDelta; //0.0922;
const LONGITUDE_DELTA = deltas.longitudeDelta;
const initialState = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

const App = props => {
  const { places, isFetching } = props.places;
  const { distances } = props.distances;
  props.fetchUserLocation();
  let area = props.area;
  let userLocation = props.userLocation;
  let routes = props.routes;
  let steps = props.steps;
  const hasUserLocation = userLocation.hasOwnProperty("latitude");
  //  addCircle(hasUserLocation, userLocation, area);
  //  addMarkers(places, distances, area, userLocation);

  return (
    <View>
      <View style={styles.container}>
        <CustomMap
          places={places}
          distances={distances}
          routes={routes}
          steps={steps}
          area={area}
          userLocation={userLocation}
          ref={map => {
            customMap = map;
          }}
          isEmulator={props.isEmulator}
          onPress={e=>{console.log('Maps pressed')}}
          onMarkerSelect={(marker)=>props.fetchRoute(marker)}
        />

        {/*placeAllMarkers(places, distances, area, userLocation)*/}
        {/*Loading View*/}
        {isFetching
          ? <ActivityIndicator style={styles.loadingIndicator} />
          : null}

        {hasUserLocation
          ? <View style={styles.bottomBox}>
              <Counter
                defaultCount={area}
                onIncrease={props.increaseArea}
                ref={counter => {
                  this.counter = counter;
                }}
                onDecrease={props.decreaseArea}
              />
              <TouchableHighlight
                style={styles.button}
                onPress={props.getPlaces}
              >
                <Text>Get nearby places</Text>
              </TouchableHighlight>
              <View style={styles.zoomControl}>
                {/*<ZoomControl onIncrease={props.increaseArea}
                         onDecrease={ props.decreaseArea}/>*/}
                <TouchableHighlight style={styles.imageContainer}
                onPress={e=>props.fetchRoute({'latitude':13.0827, 'longitude':80.2707})}>
                  <Image
                    style={styles.image}
                    source={require("../go_icon.png")}
                  />
                </TouchableHighlight>
              </View>
            </View>
          : null}
      </View>
    </View>
  );
};
let added = false;

const styles = StyleSheet.create({
  progressBar: {
    height: 200,
    alignSelf: "stretch"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  container: {
    margin: 1,
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "#47F6A0",
    zIndex: 10
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    ...StyleSheet.absoluteFillObject
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 12,
    width: 160,
    justifyContent: "center",
    marginBottom: 30
  },
  zoomControl: { position: "absolute", bottom: 30, right: 30 },
  bottomBox: {
    alignItems: "center",
    justifyContent: "center"
  },
  loadingIndicator: {
    position: "absolute",
    top: 20,
    zIndex: 1
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 64,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 64,
    margin: 5
  }
});

function mapStateToProps(state) {
  return {
    places: state.places,
    area: state.area.area,
    userLocation: state.userLocation.userLocation,
    distances: state.distances,
    routes:state.route.route,
    steps:state.route.steps,
  };
}

/*
 function mapDispatchToProps(dispatch) {
 return {
 getPlaces: () => dispatch(fetchPlacesFromAPI()),
 increaseArea: () => dispatch(increaseArea()),
 decreaseArea: () => dispatch(decreaseArea()),
 getRegion: () => dispatch(getRegion()),
 getUpdatedRegion: () => dispatch(getUpdatedRegion()),
 fetchUserLocation: () => dispatch(fetchUserLocation()),
 fetchDistances (src, dest) {
 dispatch(fetchDistances(src, dest))
 },
 fetchDistances(src, dest):  bindActionCreators(fetchDistances(src, dest), dispatch)

 }
 }
 */

const mapDispatchToProps = (dispatch, props) => ({
  getPlaces: () => dispatch(fetchPlacesFromAPI()),
  increaseArea: () => dispatch(increaseArea()),
  decreaseArea: () => dispatch(decreaseArea()),
  // getRegion: () => dispatch(getRegion()),
  // getUpdatedRegion: () => dispatch(getUpdatedRegion()),
  fetchUserLocation: () => dispatch(fetchUserLocation()),
  fetchRoute (currentLocation) { dispatch(fetchRoute(currentLocation))}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
