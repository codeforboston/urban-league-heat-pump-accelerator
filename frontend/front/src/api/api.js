const fetchGetData = (https, dataFetched) => {
  fetch(https)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      dataFetched = data;
      console.log(dataFetched);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export { fetchGetData };
