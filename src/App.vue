<template>
  <div id="app">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import places from './assets/places.json';
import secrets from './assets/secrets.json';

export default {
  name: 'App',
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    console.log(places);

    this.map = L.map('map').setView([35.68, 139.75], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: secrets.mapboxToken,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    }).addTo(this.map);

    this.plotPlaces();
  },
  methods: {
    plotPlaces() {
      Object.entries(places).forEach(([key, value]) => {
        if (value.length === 0) {
          return;
        }
        const loc = value[0];

        L.marker([Number(loc.lat), Number(loc.lon)])
          .addTo(this.map)
          .bindPopup(key);
      });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  height: 100vh;
}

#map {
  height: 100%;
}
</style>
