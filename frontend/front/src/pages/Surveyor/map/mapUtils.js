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

  //we have to use home address for location instead of geolocation data. Geolocation data doesn't map home address when loaded on map app
  const checkStreetNumberIsValid = (streetNumber) => {
    // check if street number doesnt contain space and is a whole number
    if (streetNumber.trim().includes(" ")) {
      const validStreetNumber = streetNumber.replace(" ", "-");
      return validStreetNumber;
    } else {
      return streetNumber;
    }
  };
  const googleMapLink = () => {
    const waypoints = locations
      .slice(0, -1)
      .map((location) => {
        const streetNumber = checkStreetNumberIsValid(location.street_number);
        return `${streetNumber}%20${location.street_name}%20${location.city}%2C${location.state}%20${location.zip_code}`;
      })
      .join("|");

    const destinationStreetNumber = checkStreetNumberIsValid(
      destination.street_number
    );
    const destinationURLEncode = `${destinationStreetNumber}%20${destination.street_name}%20${destination.city}%2C${destination.state}%20${destination.zip_code}`;

    return `https://www.google.com/maps/dir/?api=1&destination=${destinationURLEncode}&waypoints=${waypoints}&travelmode=walking`;
  };
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    if (IOSversion() > 15) {
      const waypoints = locations
        .slice(0, -1)
        .map((location) => {
          const streetNumber = checkStreetNumberIsValid(location.street_number);
          return `&daddr=${streetNumber}%20${location.street_name}%20${location.city}%2C${location.state}%20${location.zip_code}`;
        })
        .join("");
      const destinationStreetNumber = checkStreetNumberIsValid(
        destination.street_number
      );
      const destinationURLEncode = `${destinationStreetNumber}%20${destination.street_name}%20${destination.city}%2C${destination.state}%20${destination.zip_code}`;

      return `maps://http://maps.apple.com/?&daddr=${destinationURLEncode}${waypoints}&dirflg=d`;
    } else {
      return googleMapLink();
    }
  } else {
    return googleMapLink();
  }
};
