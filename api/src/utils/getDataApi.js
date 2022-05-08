// const { Dog } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getAllDataAPI() {
  // Trae toda la data
  let allData = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  allData = allData.data.map((el) => {
    const pesoTemp = el.weight.metric.split("-");
    const alturaTemp = el.height.metric.split("-");
    const imagen = el.image.url;
    return {
      id: el.id,
      name: el.name,
      height_min: alturaTemp[0],
      height_max: alturaTemp[1],
      weight_min: pesoTemp[0],
      weight_max: pesoTemp[1],
      life_span: el.life_span,
      image: imagen,
      userCreate: false,
      temperaments: el.temperament,
    };
  });

  return allData;
}

module.exports = {
  getAllDataAPI,
};
