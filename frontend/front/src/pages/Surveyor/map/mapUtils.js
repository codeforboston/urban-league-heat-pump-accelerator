export const generateMapsLink = (locations) => {
  const destination = locations[locations.length - 1];

  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
    const waypoints = locations
      .slice(0, -1)
      .map((location) => `&daddr=${location.latitude},${location.longitude}`)
      .join("");

    return `maps://?&daddr=${destination.latitude},${destination.longitude}${waypoints}`;
  } else {
    const waypoints = locations
      .slice(0, -1)
      .map((location) => `${location.latitude},${location.longitude}`)
      .join("|");

    return `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&waypoints=${waypoints}&travelmode=walking`;
  }
};
