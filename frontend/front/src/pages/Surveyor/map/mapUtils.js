export const generateMapsLink = (locations) => {
  const destination = locations[locations.length - 1];
  // multiple waypoints for Apple Maps was introduce with IOS16 this will not work if Iphone IOS is below 15
  const userAgent = navigator.userAgent;
  const IOSversion = () => {
    const regex = /OS (\d\d?_\d(_\d)?)/;
    const match = regex.exec(userAgent);
    const IOSversion = match[1].split("_").map(parseInt);
    return IOSversion[0];
  };
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    //
    const waypoints = locations
      .slice(0, -1)
      .map((location) => `&daddr=${location.latitude},${location.longitude}`)
      .join("");

    if (IOSversion > 15) {
      return `maps://http://maps.apple.com/?&daddr=${destination.latitude},${destination.longitude}${waypoints}&dirflg=d`;
    } else {
      return `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&waypoints=${waypoints}&travelmode=walking`;
    }
  } else {
    const waypoints = locations
      .slice(0, -1)
      .map((location) => `${location.latitude},${location.longitude}`)
      .join("|");

    return `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&waypoints=${waypoints}&travelmode=walking`;
  }
};
