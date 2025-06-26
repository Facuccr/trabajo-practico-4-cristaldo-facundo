import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Character = sequelize.define("Character", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  ki: { type: DataTypes.INTEGER, allowNull: false },
  race: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
});

export default Character;
