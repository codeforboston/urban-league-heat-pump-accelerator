import React, { useEffect, useRef, useState } from "react";

function GoogleMap({ locations, travelMode }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    const bostonLatlng = { lat: 42.361145, lng: -71.057083 };
    const google = window.google;
    const map = new google.maps.Map(mapRef.current, {
      zoom: 10,
      center: bostonLatlng,
    });
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    setMap(map);
    setDirectionsService(directionsService);
    setDirectionsRenderer(directionsRenderer);
  }, []);

  useEffect(() => {
    if (map && directionsService && directionsRenderer) {
      calculateAndDisplayRoute(
        locations,
        directionsService,
        directionsRenderer
      );
    }
  }, [locations, map, directionsService, directionsRenderer]);

  function calculateAndDisplayRoute(
    locations,
    directionsService,
    directionsRenderer
  ) {
    const waypoints = locations.slice(1, -1).map((location) => ({ location }));
    const origin = locations[0];
    const destination = locations[locations.length - 1];
    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: "WALKING",
    };
    directionsService.route(request, function (result, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }

  return <div style={{ height: "500px", width: "100%" }} ref={mapRef} />;
}

// Get the API key from an environment variable
// const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default GoogleMap;
