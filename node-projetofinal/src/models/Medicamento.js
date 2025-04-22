// src/models/Cidade.js
import { DataTypes, Model } from 'sequelize';
import Fabricante from './Fabricante.js'; // Importa o modelo Estado

class Medicamento extends Model {
  static initModel(sequelize) {
    Medicamento.init(
      {
        nomeComercial: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        principioAtivo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        registroAnvisa: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        dosagem: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fabricante_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Fabricante, // Associação com Fabricante
            key: 'id',
          },
        },
      },
      {
        sequelize, // Instância do Sequelize
        modelName: 'Medicamento',
        tableName: 'medicamentos',
        timestamps: true,
      }
    );

    // Associação com Estado
    Medicamento.belongsTo(Fabricante, {
      foreignKey: 'fabricante_id',
      as: 'fabricante',
    });
  }
}

export default Medicamento;