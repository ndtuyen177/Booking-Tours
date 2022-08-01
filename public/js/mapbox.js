/* eslint-disable*/
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibmR0dXllbjE3NyIsImEiOiJjbDY4MThrbnowam02M2tvOWpsbTl1Mjl3In0.w-PeJCrVQSeC9s3iYVKBuQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ndtuyen177/cl681fxdr001d15ru0gpspbq5',
    scrollZoom: false,
    // center: [-118.11, 34.11],
    // zoom: 6,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
