function getDistanceInMeters(lat1, lng1, lat2, lng2) {
  const earthRadius = 6371000; //Earth Radius in meters
  let dLat = degToRad(lat2 - lat1); // deg2rad below
  let dLng = degToRad(lng2 - lng1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c; //distance
}

export function getDistance(src, dest) {
  let distance =
    getDistanceInMeters(
      src.latitude,
      src.longitude,
      dest.latitude,
      dest.longitude
    ) / 1000;
  return Math.round(distance * 100) / 100;
}
export function GetGeographicalDegrees(src, dest) {
  const srcLatitude = degToRad(src.latitude);
  const srcLongitude = degToRad(src.longitude);
  const destLatitude = degToRad(dest.latitude);
  const destLongitude = degToRad(dest.longitude);
  let radian = Math.atan2(
    destLongitude - srcLongitude,
    destLatitude - srcLatitude
  );
  radian = radian - (Math.PI)/ 2; // turn minus 90°
  let degrees;
  if (radian > 0) degrees = 360 - radian * 360 / (2 * Math.PI);
  else degrees = 360 - (2 * Math.PI + radian) * 360 / (2 * Math.PI);
  console.log("Angle Degree" + degrees);
  return degrees;
}
export function decode(t, e) {
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates

  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1), (l += n), (r += o), d.push([
      l / c,
      r / c
    ]);
  }
  return (d = d.map(function(t) {
    return { latitude: t[0], longitude: t[1] };
  }));
}

export function getRouteFromAPI(src, dest) {
  return getDirections(src, dest).then(responseJson => {
    let directions;
    let routePoints = [];
    if (
      responseJson &&
      responseJson.hasOwnProperty("routes") &&
      responseJson.routes.length
    ) {
      let routesJson = responseJson.routes[0];
      let route = routesJson.overview_polyline.points;
      directions = decode(route);

      let steps = routesJson.legs[0].steps;
      for (var i = 0; i < steps.length; i++) {
        routePoints.push(decode(steps[i].polyline.points));
      }
    }
    console.log("directions");
    console.log(directions);
    console.log("steps");
    console.log(routePoints);
    return { route: directions, steps: routePoints };
  });
}

export function getDirections(src, dest) {
  const mode = "driving"; // 'walking';
  //const API_KEY = 'AIzaSyAqP-GZF6rfBqL4VUNxGFxZpWGs-0gd5Y0';
  const API_KEY = "AIzaSyCQNDEF46WiaP77vT8bIlddheHJAnqIy_8";
  let sLatitude = src.latitude;
  let sLongitude = src.longitude;
  let dLatitude = dest.latitude;
  let dLongitude = dest.longitude;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${sLatitude},${sLongitude}&destination=${dLatitude},${dLongitude}&key=${API_KEY}&mode=${mode}`;

  return fetch(url).then(response => response.json()).catch(e => {
    console.warn(e);
  });
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

export function boundingCoordinates(location, distance) {
  console.log(location);
  let radLat = degToRad(location.latitude); // latitude in radians
  let radLon = degToRad(location.longitude); // longitude in radians

  let degLat; // latitude in degrees
  let degLon; // longitude in degrees

  const MIN_LAT = degToRad(-90); // -PI/2
  const MAX_LAT = degToRad(90); //  PI/2
  const MIN_LON = degToRad(-180); // -PI
  const MAX_LON = degToRad(180); //  PI
  let earthRadius = 6371.01;
  if (earthRadius < 0 || distance < 0) return;
  // angular distance in radians on a great circle
  let radDist = distance / earthRadius;

  let minLat = radLat - radDist;
  let maxLat = radLat + radDist;

  let minLon, maxLon;
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    let deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
    minLon = radLon - deltaLon;
    if (minLon < MIN_LON) minLon += 2 * Math.PI;
    maxLon = radLon + deltaLon;
    if (maxLon > MAX_LON) maxLon -= 2 * Math.PI;
  } else {
    // a pole is within the distance
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }
  const result = {
    min: { latitude: radToDeg(minLat), longitude: radToDeg(minLon) },
    max: { latitude: radToDeg(maxLat), longitude: radToDeg(maxLon) }
  };
  console.log(result);
  return result;
}

export function getDeltas(latitude, radiusInKM, aspectRatio) {
  const earthRadiusInKM = 6371.01;

  const radiusInRad = radiusInKM / earthRadiusInKM;
  const longitudeDelta = radToDeg(radiusInRad / Math.cos(degToRad(latitude)));
  const latitudeDelta = aspectRatio * radToDeg(radiusInRad);
  return {
    longitudeDelta,
    latitudeDelta
  };
}
export function meterToKm(meters) {
  return meters / 1000;
}
export function kmToMeters(kms) {
  return kms * 1000;
}
