import 'core-js/stable';
import 'regenerator-runtime/runtime';
import fs from 'fs';
import axios from 'axios';
import placeNames from '../place-names.json';
import savedPlaces from '../places.json';

const geocode = async (search) => {
  await seconds(1);
  try {
    const { data } = await axios({
      url: `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2&extratags=1&namedetails=1`,
      headers: {
        'User-Agent': 'Oneironaut-Japan-Map'
      }
    });
    return data;
  } catch(err) {
    console.error(search, err);
  }
};

const seconds = async (secs) => {
  return new Promise((res) => setTimeout(res, secs * 1000));
};

(async () => {
  console.log('Geocoding\n');
  const places = savedPlaces;
  
  for(let i = 0; i < placeNames.length; i++) {
    const placeName = placeNames[i];
    console.log(`${i + 1} / ${placeNames.length} - ${placeName}`);
    const loc = await geocode(placeName);

    if(loc) {
      console.log(`${loc.length} locations found\n`);
      places[placeName] = loc;
      fs.writeFileSync('./places.json', JSON.stringify(places));

    } else {
      console.log('No locations found\n');
    }
  }
})();