/*
 * Transform backend surveyor keys to match surveyor form name fields
 */
export const transformSurveyorKeys = (data) => {
  if (!data) return null;

  const { firstname, lastname, street_address, zipcode, ...rest } = data;
  return {
    ...rest,
    firstName: firstname,
    lastName: lastname,
    streetAddress: street_address,
    zipCode: zipcode,
  };
};
