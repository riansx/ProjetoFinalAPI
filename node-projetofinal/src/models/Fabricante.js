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
        documentoRegistro: {
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
        sequelize, // Instância do Sequelize
        modelName: 'Fabricante',
        tableName: 'fabricantes',
        timestamps: true,
      }
    );
  }
}

export default Fabricante;