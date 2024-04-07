const axios = require('axios');

function getAllCities(url) {
  return axios.get(url, {
    headers: {
      'X-RapidAPI-Key': '544ab5c1d1msh21eb38ee3d08c9ap1c3972jsn80695f100c3d',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  }).then(response => response.data);
}

function getAllDataCit() {
  let allData = [];
  let i = 1;
  function getNextPage(url) {
    return new Promise(resolve => {
      setTimeout(() => {
        getAllCities(url).then((response) => {
          allData = allData.concat(response.data);
          const nextLink = response.links.find(link => link.rel === 'next');
          if (nextLink) {
            console.log(i++);
            resolve(getNextPage(`https://wft-geo-db.p.rapidapi.com${nextLink.href}`));
          } else {
            resolve(allData);
          }
        });
      }, 1500);
    });
  }
  return getNextPage(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=CITY&countryIds=Q184&minPopulation=5000&languageCode=ru`);
  // return getNextPage(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=CITY&countryIds=Q184&languageCode=ru`);
}

getAllDataCit().then((allData) => {
  let arr = allData.map(item => [item.name, item.region, item.wikiDataId, item.latitude, item.longitude]);

  arr.forEach(item => {
    axios.post(`http://localhost:3001/cities`, {
      name: item.name,
      district: ' ',
      region: item.region,
      wikiDataId: item.wikiDataId,
      latitude: item.latitude,
      longitude: item.longitude
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  });
});