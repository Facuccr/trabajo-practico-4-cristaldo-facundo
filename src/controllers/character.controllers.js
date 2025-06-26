import Character from "../models/character.model.js";

//obtenemos todos los pjs
export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.status(200).json(characters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los pjs", error: error.message });
  }
};

//obtener personaje por id
export const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id);
    if (!character) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }
    res.status(200).json(character);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al obtener el personaje", error: error.message });
  }
};
//crear personaje

export const createCharacter = async (req, res) => {
  const { name, ki, race, gender, description } = req.body;

  //VALIDACIONES
  if (!name || !ki || !race || !gender) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  if (!Number.isInteger(ki)) {
    return res.status(400).json({ message: "El ki debe ser un numero entero" });
  }
  if (gender !== "Male" && gender !== "Female") {
    return res
      .status(400)
      .json({ message: "el genero solo puede ser 'Male' o 'Female'" });
  }
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      message:
        "El campo solo debe ser una cadena de texto si se desea proporcionar",
    });
  }

  try {
    const existCharacter = await Character.findOne({ where: { name } });
    if (existCharacter) {
      return res
        .status(400)
        .json({ message: "ya existe un personaje con ese nombre" });
    }
    //se crea el nuevo personaje si sale todo bien
    const newCharacter = await Character.create({
      name,
      ki,
      race,
      gender,
      description,
    });
    res.status(201).json(newCharacter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al crear el personaje", error: error.message });
  }
};
//actualizar algun personaje
export const updateCharacter = async (req, res) => {
  const { id } = req.params;
  const { name, ki, race, gender, description } = req.body;
  //VALIDACIONES de campos obligatorios
  if (name !== undefined && !name) {
    return res.status(400).json({ message: "El nombre no puede estar vacio" });
  }
  if (ki !== undefined && !Number.isInteger(ki)) {
    return res
      .status(400)
      .json({ message: "el ki debe de ser un entero valido" });
  }
  if (race !== undefined && !race) {
    return res
      .status(400)
      .json({ message: "el campo race no puede estar vacio" });
  }
  if (gender !== undefined && gender !== "Male" && gender !== "Female") {
    return res
      .status(400)
      .json({ message: "El genero solo puede ser 'Male' o 'Female'" });
  }
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      message: "La descripcion no debe de ser un numero si lo desea completar",
    });
  }

  try {
    const character = await Character.findByPk(id); //busco pj por id
    if (!character) {
      res.status(404).json({ message: "El personaje no a sido encontrado" });
    }
    if (name && name !== Character.name) {
      //valido que no exista un personaje con ese nombre q se quiere actualizar
      const existCharacter = await Character.findOne({ where: { name } });
      if (existCharacter) {
        return res
          .status(400)
          .json({ message: "Ya exixste un pj con este nombre" });
      }
    }
    //actualizo los campos del pj, y se mantienen las mismas si no se completan
    if (name !== undefined) character.name = name;
    if (ki !== undefined) character.ki = ki;
    if (race !== undefined) character.race = race;
    if (gender !== undefined) character.gender = gender;
    if (description !== undefined) character.description = description;

    await character.save();
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({
      message: "no se pudo actualizar el personaje",
      error: error.message,
    });
  }
};
//borrar personaje
export const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id); //buscamos id

    if (!character) {
      res
        .status(404)
        .json({ message: "No se encontro personaje para eliminar" });
    }

    await character.destroy();
    res.status(204).send(); //eliminamos y enviamos, indicando q todo salio bien pero no hay nada q mostrar
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al eliminar el pj", error: error.message });
  }
};
