import { DataTypes, Model } from 'sequelize'
import sequelizeMysql from '../index.js'

export default class ModelDataEsp extends Model {}

ModelDataEsp.init(
  {
    idRow: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      field: 'ID',
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LATITUDE',
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LONGITUDE',
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'REGISTRATION_DATE',
    },
  },
  {
    sequelize: sequelizeMysql,
    modelName: 'ModelDataEsp',
    tableName: 'DATA_ESP',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    timestamps: false,
  }
)
