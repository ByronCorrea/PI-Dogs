const { Router } = require("express");
const router = Router();
const { Breed, Temperament } = require("../db");
const utils = require("../utils/getDataApi");

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;

    let dataApi = await utils.getDataApi();
    let dataDb = await Breed.findAll({
      include: Temperament,
    });
    // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
    dataDb = dataDb.map((el) => {
      return {
        id: el.id,
        name: el.name,
        height_min: el.height_min,
        height_max: el.height_max,
        weight_min: el.weight_min,
        weight_max: el.weight_max,
        life_span: el.life_span,
        image: el.image,
        userCreate: true,
        temperaments: el.Temperaments.map((i) => {
          return i.name;
        }).join(", "),
      };
    });
    // resp de API y de DB juntas
    let allData = dataDb.concat(dataApi);

    if (name) {
      let resp = allData.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      ); // ==> trae todos los q tengan la palabra buscada
      // console.log(resp);
      if (resp.length === 0) {
        return res.status(404).send(`${name} > No se encuentra Guardado`);
      }
      return res.json(resp);
    } else {
      res.json(allData);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id >= 1000) {
      let dataDb = await Breed.findByPk(id, {
        include: Temperament,
      });
      console.log(dataDb.name);
      res.json({
        id: dataDb.id,
        name: dataDb.name,
        height_min: dataDb.height_min,
        height_max: dataDb.height_max,
        weight_min: dataDb.weight_min,
        weight_max: dataDb.weight_max,
        life_span: dataDb.life_span,
        image: dataDb.image,
        userCreate: true,
        temperaments: dataDb.Temperaments.map((i) => {
          return i.name;
        }).join(", "),
      });
    } else {
      let dataApi = await utils.getDataApi();
      let resp = dataApi.find((el) => el.id.toString() === id.toString());
      if (resp === undefined) {
        res.status(404).json("Id no coincide con un perro exstente");
      }
      res.send(resp);
    }
  } catch (error) {
    next(error);
  }
});

//  POST /________________________________________________________________

router.post("/", async (req, res, next) => {
  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    image,
    temperaments,
  } = req.body;
  try {
    let dogCreated = await Breed.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      image,
    });

    // if (temperaments.length) {
    // temperaments.map(async (tem) => {
    try {
      let temper = await Temperament.findOrCreate({ where: { name: tem } });
      // console.log(temper.dataValues.name);
      dogCreated.addTemperament(temper[0]);
      // res.send(dogCreated);
      console.log("Perro Cargado");
    } catch (err) {
      console.log(err);
    }
    // });
    // }
    res.send("Perro cargado");
  } catch (error) {
    next(error);
  }
  // res.json(dogCreated);
});
//////////////////////////////////////////////////////////////////////////////////
//DELETE

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    Breed.destroy({ where: { id: id } });
    let dataApi = await utils.getDataApi();
    let dataDb = await Breed.findAll({
      include: Temperament,
    });
    // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
    dataDb = dataDb.map((el) => {
      return {
        id: el.id,
        name: el.name,
        height_min: el.height_min,
        height_max: el.height_max,
        weight_min: el.weight_min,
        weight_max: el.weight_max,
        life_span: el.life_span,
        image: el.image,
        userCreate: true,
        temperaments: el.Temperaments.map((i) => {
          return i.name;
        }).join(", "),
      };
    });
    // resp de API y de DB juntas
    let allData = dataDb.concat(dataApi);
    console.log("Perro ELIMINADO de DB".bgRed);
    res.send(allData);
    // res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
