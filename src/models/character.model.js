import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Character = sequelize.define("Character", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ki: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  race: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [["Male", "Female"]], //validacion para asegurar que acepte solo esos valores.
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Character;
