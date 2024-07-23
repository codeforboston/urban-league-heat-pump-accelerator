export const generateMapsLink = (locations) => {
  const destination = locations[locations.length - 1];
  // multiple waypoints for Apple Maps was introduce with IOS16 this will not work if Iphone IOS is below 15
  const userAgent = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    const waypoints = locations
      .slice(0, -1)
      .map((location) => `&daddr=${location.latitude},${location.longitude}`)
      .join("");

    return `maps://http://maps.apple.com/?&daddr=${destination.latitude},${destination.longitude}${waypoints}&dirflg=d`;
  } else {
    const waypoints = locations
      .slice(0, -1)
      .map((location) => `${location.latitude},${location.longitude}`)
      .join("|");

    return `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&waypoints=${waypoints}&travelmode=walking`;
  }
};
