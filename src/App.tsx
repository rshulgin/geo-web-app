import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import React from 'react';

const tiles1 = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
);


const map2 = L.map('map_root').setView([31.771959, 35.217018], 8).addLayer(tiles1);
const bounds = L.latLngBounds(
    L.latLng(29.487, 34.245), // Southwestern point of Israel
    L.latLng(33.345, 35.836)  // Northeastern point of Israel
);

map2.fitBounds(bounds);

map2.pm.addControls({
  position: 'topright',
  drawMarker: false,
  drawPolygon: true,
  editMode: true,
  drawPolyline: false,
  drawCircleMarker: false,
  drawText: false,
  removalMode: true,
});

map2.pm.disableDraw('Polygon');
map2.pm.enableDraw('Circle', {
  snappable: true,
  cursorMarker: true
});

map2.pm.enableDraw('Line', { allowSelfIntersection: false });
map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });

let geoJsonData
try {
  geoJsonData = JSON.parse(localStorage.areas)
} catch (e) { localStorage.areas = ''}


if(geoJsonData) {
  const theCollection = L.geoJson(geoJsonData, {
    pointToLayer: (feature, latlng) => {
      if (feature.properties.customGeometry) {
        return new L.Circle(latlng, feature.properties.customGeometry.radius);
      } else {
        return new L.Marker(latlng);
      }
    },
  });

  theCollection.addTo(map2);

  const b = theCollection.getBounds();
  map2.fitBounds(b);

  console.log(theCollection);

  theCollection.on('pm:edit', function (e) {
    console.log(e);
  });

  theCollection.on('pm:dragstart', function (e) {
    console.log(e);
  });

}

map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });
map2.pm.disableDraw('Polygon');
map2.pm.enableDraw('Line', { allowSelfIntersection: false });
map2.pm.disableDraw('Line');

function treatCircle(geoJson: any, layer: any) {
  if(geoJson.geometry.type === 'Point') {
    geoJson.properties = {
      customGeometry: {
        radius: layer.getRadius()
      }
    }
  }
  return geoJson
}

function saveToStorageSendData() {
  const res = [];
  const layers = (map2 as any)._layers
  for(const key in layers) {
    const layer = layers[key]
    if(layer.toGeoJSON && layer.toGeoJSON().geometry) {
      res.push(treatCircle(layer.toGeoJSON(), layer));
    }
  }
  localStorage.areas = res.length
      ? JSON.stringify({
        type: 'FeatureCollection',
        features: res })
      : ''
  console.log('data ready for sending::', res);
}

function App() {
  return (
    <div className="App">
      <button onClick={saveToStorageSendData} className="save-button">Save</button>
    </div>
  );
}

export default App;
