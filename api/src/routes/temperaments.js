const { Router } = require("express");
const { Temperament } = require("../db");
const axios = require("axios");
// const services = require("../services/services_API");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Get a /temperament
router.get("/", async (req, res, next) => {
  try {
    // Me traigo los Dogs de la api
    const resultado = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    // Guardo en lista de temperamentos todos los resultados despues de aplicarle limpieza a cada uno
    const listaTemperamentos = resultado.data.map((dog) => {
      // Si no viene un temperamento agrego undefined
      if (!dog.temperament) return (dog.temperament = undefined);
      // A todos los demas los spliteo por ", " para añadirlos a un array en la constante aux
      const aux = dog.temperament.split(", ");
      return aux;
    });

    const limparValoresUndefined = listaTemperamentos.flat().filter(Boolean); // limpio todo lo que sea null, undefine sin importar el nivel en el que este en el array
    const valoresUnicos = new Set(limparValoresUndefined); // Quito todas las repeticiones y solo dejo un valor unico
    const resultadoFinal = [...valoresUnicos]; // hago destructurin del array valores unicos y los guardo en resultadoFinal

    // Encuentro o creo en el modelo de Temperamento, cada temperamento donde el nombre sea igual al dog en el que estoy en ese momento
    resultadoFinal.forEach((dog) =>
      Temperament.findOrCreate({
        where: {
          name: dog,
        },
      })
    );

    const resultado2 = await Temperament.findAll(); // Me traigo todos los temperamentos de la base de datos
    res.send(resultado2);
  } catch (error) {
    next(error);
  }
});

// router.get("/", async (req, res, next) => {
//   //Devuelve todos los temperamentoos de la base d datos
//   // Precargados cuando se inicia la base de datos

//   try {
//     let temperament = await Temperament.findAll();
//     temperament = temperament.map((el) => {
//       return el;
//     });

//     console.log(" Temperamentos traidos de BD ".black.bgBlue);
//     res.json(temperament);
//   } catch (error) {
//     next("Rompio el get Temperament >  ".bgRed, error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   const { name } = req.body;
//   try {
//     const newTemperament = await Temperament.create({
//       name,
//     });
//     console.log(" Temperamentos nuevo guardado ".black.bgBlue);
//     res.json(newTemperament);
//   } catch (error) {
//     next("Rompio el POST Temperament: ".red, error);
//   }
// });

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  console.log("1,: ", res);
  const newTemperament = Temperament.create({
    name,
  })
    .then((resp) => {
      // console.log(res);
      return res.send(resp);
      // return res.json;
    })
    .catch((error) => console.log(error));
});

module.exports = router;
