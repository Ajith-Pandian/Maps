import React from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableHighlight, Dimensions, StatusBar, ActivityIndicator, Image
} from 'react-native';
import MapView from 'react-native-maps';
import {Counter} from '../components/Counter'
import renderIf from './renderIf'
import {
    getDeltas,
    meterToKm,getRouteFromAPI,
} from './Utils'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getState} from 'redux-thunk'
import {fetchPlacesFromAPI} from '../redux/actions/placesActions'
import {increaseArea, decreaseArea} from '../redux/actions/areaActions'
import {fetchUserLocation} from '../redux/actions/userLocationActions'
import {fetchDistances} from '../redux/actions/distanceActions'
const {height, width} = Dimensions.get('window');

//LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE = 12.938;
const LONGITUDE = 77.6101227;
const ASPECT_RATIO = width / height;
let deltas = getDeltas(LATITUDE, 5, ASPECT_RATIO);
const LATITUDE_DELTA = deltas.latitudeDelta;//0.0922;
const LONGITUDE_DELTA = deltas.longitudeDelta;
const initialState = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

const App = (props) => {
//class App extends Component {
    /*constructor() {
     super();
     this.mapRef = null;
     this.state = {
     hasRoute: false,
     hasUserLocation: false,
     currentLocation: {'latitude': 0.0, 'longitude': 0.0},
     filteredPlaces: [],
     areaRadius: 5000,
     }
     ;
     }
     componentDidMount() {
     navigator.geolocation.getCurrentPosition(
     (position) => {
     this.setState({
     region: {
     latitude: position.coords.latitude,
     longitude: position.coords.longitude,
     latitudeDelta: LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA
     },
     currentLocation: {
     latitude: position.coords.latitude,
     longitude: position.coords.longitude,
     },
     hasUserLocation: true
     });
     },
     (error) => alert(error.message),
     {enableHighAccuracy: true, timeout: 50000, maximumAge: 1000}
     );

     this.watchID = navigator.geolocation.watchPosition((position) => {
     const newRegion = {
     latitude: position.coords.latitude,
     longitude: position.coords.longitude,
     latitudeDelta: LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA
     };
     const currentLocation = {
     latitude: position.coords.latitude,
     longitude: position.coords.longitude,
     };
     console.log(newRegion);

     this.onRegionChange(newRegion, currentLocation);
     });
     }

     componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchID);
     }


     onRegionChange(region, currentLocation) {
     this.setState({region, currentLocation});
     }


     render() {*/
    const {places, isFetching} = props.places;
    const {distances} = props.distances;
    console.log(distances);
    props.fetchUserLocation();
    let area = props.area;
    console.log(area);

    let userLocation = props.userLocation;
    const hasUserLocation = userLocation.hasOwnProperty('latitude');
    //let getAllDistances = props.fetchDistances;

    return (
        <View>
            <View style={styles.container}>

                <MapView
                    style={styles.map}
                    initialRegion={initialState}
                    ref={ (MapRef) => {
                        if (MapRef !== null) {
                            MapRef.fitToElements(true)
                        }
                    }}
                    showsUserLocation={true}
                    showsScale={true}
                    showsCompass={true}
                    showsMyLocationButton={true}
                    cacheEnabled={true}
                    moveOnMarkerPress={true}>

                    {  hasUserLocation ? (<MapView.Circle
                        center={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude
                        }}
                        radius={area * 1000}
                        fillColor="rgba(0, 0, 0, 0.2)"
                        strokeColor="rgba(0, 0, 0, 0.2)"/>) : null}


                    {
                            placeAllMarkers(places,distances,area,userLocation)
                    }

                </MapView>
                {/*Loading View*/}
                {isFetching ? <ActivityIndicator style={styles.loadingIndicator}/> : null}

                {  hasUserLocation ? (<View style={styles.bottomBox}>
                    <Counter defaultCount={area}
                    onIncrease={props.increaseArea}
                    ref={(counter)=>{this.counter=counter}}
                             onDecrease={ props.decreaseArea}/>
                    <TouchableHighlight
                        style={styles.button} onPress={props.getPlaces}>
                        <Text>Get nearby places</Text>
                    </TouchableHighlight>
                    <View style={styles.zoomControl}>
                        {/*<ZoomControl onIncrease={props.increaseArea}
                         onDecrease={ props.decreaseArea}/>*/}
                        <TouchableHighlight style={ styles.imageContainer }>
                            <Image style={styles.image} source={require('../go_icon.png')}/>
                        </TouchableHighlight>

                    </View>
                </View>) : null}
            </View>
        </View>);
};


const styles = StyleSheet.create(
    {
        progressBar: {
            height: 200,
            alignSelf: 'stretch'
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
        container: {
            margin: 1,
            ...StyleSheet.absoluteFillObject,
            height: height,
            width: width,
            paddingTop: StatusBar.currentHeight,
            justifyContent: 'flex-end',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            backgroundColor: '#47F6A0',
            zIndex: 10
        },
        map: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            ...StyleSheet.absoluteFillObject,

        },
        button: {
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: 20,
            padding: 12,
            width: 160,
            justifyContent: 'center',
            marginBottom: 30,
        },
        zoomControl: {position: 'absolute', bottom: 30, right: 30},
        bottomBox: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        loadingIndicator: {
            position: 'absolute', top: 20, zIndex: 1
        },
        imageContainer: {
            height: 50,
            width: 50,
            borderRadius: 64,
            backgroundColor: 'rgba(255,255,255,0.7)',
            marginBottom: 30,
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            height: 30,
            width: 30,
            borderRadius: 64,
            margin: 5,
        },
    });
    function placeAllMarkers(places,distances,area,userLocation)
    {let markers=[];
      if((places&&places.length>0)&&(distances&&distances.length>0)){
        { places.forEach((place,index)=>{
            const {latitude, longitude} = place;
            const currentLocation = {latitude, longitude,};
            if( ((distances[index]) <= area * 1000))
                markers.push(<MapView.Marker
                    coordinate={currentLocation}
                    title={`${index}.${place.name}`}
                    description={`Distance: ${meterToKm(distances[index])} kms`}
                    key={index}
                    onPress={()=>drawDirections(userLocation,currentLocation)}
                />)
          })
        return markers;}
    }}
    const drawDirections=(userLocation,currentLocation)=>
    {console.log('Directions');
     getRouteFromAPI(userLocation,currentLocation)
     .then((route)=>{
       console.log('Route - '+route)
      return <MapView.Polyline
                //key={polyline.id}
                coordinates={route}
                strokeColor="#000"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={2}/>;
    })
  }
function mapStateToProps(state) {

    return {
        places: state.places,
        area: state.area.area,
        userLocation: state.userLocation.userLocation,
        distances: state.distances,
    }
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

const mapDispatchToProps = (dispatch, props) =>
    (
        {
            getPlaces: () => dispatch(fetchPlacesFromAPI()),
            increaseArea: () => dispatch(increaseArea()),
            decreaseArea: () => dispatch(decreaseArea()),
            // getRegion: () => dispatch(getRegion()),
            // getUpdatedRegion: () => dispatch(getUpdatedRegion()),
            fetchUserLocation: () => dispatch(fetchUserLocation()),
        }
    );


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
