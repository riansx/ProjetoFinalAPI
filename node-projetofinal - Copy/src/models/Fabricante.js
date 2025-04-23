// src/models/Estado.js
import { DataTypes, Model } from 'sequelize';

class Fabricante extends Model {
  static initModel(sequelize) {
    Fabricante.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        documento_registro: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
          },
          pais: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      },
      {
        sequelize, 
        modelName: 'Fabricante',
        tableName: 'fabricantes',
        timestamps: true,
      }
    );
  }
}

export default Fabricante;