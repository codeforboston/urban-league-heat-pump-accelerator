export const generateMapsLink = (locations) => {
  const origin = locations[0];
  const destination = locations[locations.length - 1];

  const waypoints = locations
    .slice(1, -1)
    .map((location) => `${location.latitude},${location.longitude}`)
    .join("|");

  return `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&waypoints=${waypoints}&travelmode=walking`;
};
